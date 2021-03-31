import { useContext, useEffect, useState } from "react"
import { ImageInfo } from "../../components/molecules/layer_image"
import SegmentationTemplate from "../../components/templates/segmentation"
import { eel } from "../../eel"
import FilePathWrapper from "../../domain/filepath_wrapper"
import { setFilePathList, setSelectedFile } from "../../store/actions"
import { AppContext, NO_INDEX } from "../../store/stores"
import { CanvasAreaProps } from "../../components/organisms/canvas_area"
import { errorLog, log } from "../../utils/logger"


export const SegmentationPage = () => {
  log("Render on SegmentationPage")

  const { state, dispatch } = useContext(AppContext)

  const [imageInfo, setImageInfo] = useState<ImageInfo>({
    fileName: "No image",
    imageSrc: null,
    width: 400,
    height: 400
  })

  const onFileRowClick = (filePath: FilePathWrapper, index: number) => {
    dispatch(setSelectedFile(index))
  }

  const loadFilePathList = async () => {
    const filepathList: string[] = await eel.load_filepath_list(state.imagesPath?.filePath)()
    if (filepathList === null) {
      errorLog("filepathlist null")
      // TODO エラーダイアログ
      return
    }
    const filePathWrapperList = filepathList.map((filepath: string) =>
      new FilePathWrapper(filepath)
    )
    dispatch(setFilePathList(filePathWrapperList))
  }

  useEffect(() => {
    log("Fetch file path list")
    loadFilePathList().then(() => {
      dispatch(setSelectedFile(0))
    })
  }, [])


  // 選択されたファイルインデックスにフック
  useEffect(() => {
    if (state.selectedFilePathIndex === NO_INDEX) {
      return
    }
    const filePath = state.filePathList[state.selectedFilePathIndex]
    eel.load_jpeg_image_and_width_height(filePath.filePath)()
      .then((imageInfo: [any, number, number]) => setImageInfo({
        fileName: filePath.getFileName(),
        imageSrc: imageInfo[0],
        width: imageInfo[1],
        height: imageInfo[2]
      }))
  }, [state.selectedFilePathIndex])

  const canvasAreaProps: CanvasAreaProps = {
    imageInfo: imageInfo,
    labelList: state.labelList
  }

  return (
    <SegmentationTemplate
      onFileClick={onFileRowClick}
      filePathList={state.filePathList}
      selectedFileIndex={state.selectedFilePathIndex}
      canvasAreaProps={canvasAreaProps} />
  )
}