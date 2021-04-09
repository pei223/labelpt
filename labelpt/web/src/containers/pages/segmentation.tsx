import { useContext, useEffect, useState } from 'react'
import { ImageInfo } from '../../components/molecules/layer_image'
import SegmentationTemplate from '../../components/templates/segmentation'
import { eel } from '../../eel'
import FilePathWrapper from '../../domain/filepath_wrapper'
import { setFilePathList, setSelectedFile } from '../../store/actions'
import { AppContext, NO_INDEX } from '../../store/stores'
import { CanvasAreaProps } from '../../components/organisms/canvas_area'
import { errorLog, log } from '../../utils/logger'
import { AnnotationManager } from '../../domain/annotation_manager'

export const SegmentationPage = () => {
  log('Render on SegmentationPage')

  const { state, dispatch } = useContext(AppContext)
  const [annotationManager, _] = useState(new AnnotationManager())
  const [infoToastMessage, setInfoToastMessage] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const [imageInfo, setImageInfo] = useState<ImageInfo>({
    fileName: '',
    imageSrc: null,
    annotationImgSrc: null,
    width: 400,
    height: 400,
  })

  const saveAnnotationResult = async () => {
    const prevFilePath = state.filePathList[state.selectedFilePathIndex]
    const result = await eel.save_annotation_result(
      state.saveAnnotationsPath?.filePath,
      prevFilePath.getFileName(),
      annotationManager.toBase64Image(
        document.getElementById('annotated-layer') as HTMLCanvasElement
      ),
      state.labelList.length
    )()
  }

  const onFileRowClick = async (_: FilePathWrapper, index: number) => {
    setLoading(true)
    saveAnnotationResult().then(() => {
      dispatch(setSelectedFile(index))
      setLoading(false)
    })
  }

  const onSaveClick = () => {
    setLoading(true)
    saveAnnotationResult().then(() => {
      setInfoToastMessage('Saved!')
      setLoading(false)
    })
  }

  const loadFilePathList = async () => {
    const filepathList: string[] = await eel.load_filepath_list(
      state.imagesPath?.filePath
    )()
    if (filepathList === null) {
      errorLog('filepathlist null')
      // TODO エラーダイアログ
      return
    }
    const filePathWrapperList = filepathList.map(
      (filepath: string) => new FilePathWrapper(filepath)
    )
    dispatch(setFilePathList(filePathWrapperList))
  }

  useEffect(() => {
    log('Fetch file path list')
    setLoading(true)
    loadFilePathList().then(() => {
      setLoading(false)
      dispatch(setSelectedFile(0))
    })
  }, [])

  // 選択されたファイルインデックスにフック
  useEffect(() => {
    if (state.selectedFilePathIndex === NO_INDEX) {
      setLoading(false)
      return
    }
    setLoading(true)
    const filePath = state.filePathList[state.selectedFilePathIndex]
    eel
      .load_img_and_annotation_and_width_height(
        filePath.filePath,
        state.saveAnnotationsPath?.filePath
      )()
      .then((imageInfo: [string, string, number, number]) => {
        setImageInfo({
          fileName: filePath.getFileName(),
          imageSrc: imageInfo[0],
          annotationImgSrc: imageInfo[1],
          width: imageInfo[2],
          height: imageInfo[3],
        })
        setLoading(false)
      })
  }, [state.selectedFilePathIndex])

  const canvasAreaProps: CanvasAreaProps = {
    annotationManager: annotationManager,
    imageInfo: imageInfo,
    labelList: state.labelList,
    onSaveClick: onSaveClick,
  }

  return (
    <SegmentationTemplate
      onSaveShortcut={onSaveClick}
      infoToastMessage={infoToastMessage}
      onInfoToastClose={() => setInfoToastMessage('')}
      onFileClick={onFileRowClick}
      filePathList={state.filePathList}
      selectedFileIndex={state.selectedFilePathIndex}
      canvasAreaProps={canvasAreaProps}
      isLoading={isLoading}
    />
  )
}
