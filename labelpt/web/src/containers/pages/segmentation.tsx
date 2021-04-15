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
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [imageInfo, setImageInfo] = useState<ImageInfo>({
    fileName: '',
    imageSrc: null,
    annotationImgSrc: null,
    width: 400,
    height: 400,
  })

  const saveAnnotationResult = async (): Promise<boolean> => {
    const prevFilePath = state.filePathList[state.selectedFilePathIndex]
    return await eel.save_annotation_result(
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
    saveAnnotationResult()
      .then((result: boolean) => {
        if (!result) {
          errorLog('save annotation onFileRowClick result is false')
          setErrorMessage('Save annotation result is failed.')
          return
        }
      })
      .catch((e: Error) => {
        errorLog(
          'Save annotation result is failed onFileRowClick. ' + e.message
        )
        setErrorMessage('Save annotation result is failed.')
      })
      .finally(() => {
        dispatch(setSelectedFile(index))
        setLoading(false)
      })
  }

  const onSaveClick = () => {
    setLoading(true)
    saveAnnotationResult()
      .then((result: boolean) => {
        if (!result) {
          errorLog('save annotation onSaveClick result is false')
          setErrorMessage(
            'Save annotation result is failed. Result image is null.'
          )
          return
        }
        setInfoToastMessage('Saved!')
      })
      .catch((e: Error) => {
        errorLog('Save annotation result is failed onSaveClick. ' + e.message)
        setErrorMessage('Save annotation result is failed.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const loadFilePathList = async () => {
    const filepathList: string[] = await eel.load_filepath_list(
      state.imagesPath?.filePath
    )()
    if (filepathList === null) {
      errorLog('filepathlist null')
      setErrorMessage('Load filepath list is failed. filepathList is null')
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
    loadFilePathList()
      .then(() => {
        dispatch(setSelectedFile(0))
      })
      .catch((e: Error) => {
        errorLog('loadFilePathList error. ' + e.message)
        setErrorMessage('Load filepath is failed.')
      })
      .finally(() => {
        setLoading(false)
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
      .then((imageInfo: [string, string, number, number] | null) => {
        if (imageInfo === null) {
          errorLog('imageinfo is null')
          setErrorMessage('Load image is failed.')
          return
        }
        setImageInfo({
          fileName: filePath.getFileName(),
          imageSrc: imageInfo[0],
          annotationImgSrc: imageInfo[1],
          width: imageInfo[2],
          height: imageInfo[3],
        })
      })
      .catch((e: Error) => {
        errorLog('Error on load image. ' + e.message)
        setErrorMessage('Load image is failed.')
      })
      .finally(() => {
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
      canvasAreaProps={canvasAreaProps}
      filePathList={state.filePathList}
      selectedFileIndex={state.selectedFilePathIndex}
      infoToastMessage={infoToastMessage}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onFileClick={onFileRowClick}
      onSaveShortcut={onSaveClick}
      onRedoShortcut={() => annotationManager.getMode().redo()}
      onUndoShortcut={() => annotationManager.getMode().undo()}
      onInfoToastClose={() => setInfoToastMessage('')}
      onErrorDialogClose={() => setErrorMessage('')}
    />
  )
}
