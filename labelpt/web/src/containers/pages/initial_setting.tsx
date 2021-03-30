import { useContext, useState } from "react"
import { eel } from "../../eel"
import { addLabelAction, setInitialSettingValue, setLabelList } from "../../store/actions"
import { AppContext, } from "../../store/stores"
import InitialSettingTemplate from "../../components/templates/initial_setting"
import { errorLog, log } from "../../utils/logger"
import Label from "../../domain/label"
import FilePathWrapper from "../../domain/filepath_wrapper"
import { InfoModalProps } from "../../components/molecules/info_modal"



export const InitialSettingPage = () => {
  const { state, dispatch } = useContext(AppContext)
  const [imagesPath, setImagesPath] = useState("")
  const [annotationPath, setAnnotationPath] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")

  const onLoadLabelClick = async () => {
    const labelList: string[] = await eel.load_labels_from_file()()
    if (labelList === null || labelList === undefined) {
      errorLog("no annotations filepath")
      setErrorMessage("Error occurred on load label.")
      return
    }
    labelList.splice(0, 0, "background")
    const labelInfoList: Label[] = labelList.map((labelname: string, index: number) => (new Label(index, labelname)))
    dispatch(setLabelList(labelInfoList))
  }

  const onSaveLabelClick = async () => {
    const labelStrList = state.labelList.map((label: Label) => label.name)
    const result: boolean | null = await eel.save_labels_to_file(labelStrList.slice(1))()
    if (result === null || result === undefined) {
      errorLog("Save label response is null or undefined: " + result)
      setErrorMessage("Error occurred on save label.")
      return
    }
    setInfoMessage("Save label is succeeded.")
  }

  const onSubmit = async (imagesPath: string, annotationPath: string) => {
    log("State: " + state)
    if (imagesPath === "" || annotationPath === "") {
      return
    }
    const isImagesPathExist = await eel.is_directory_path_exist(imagesPath)();
    const isAnnotationPathExist = await eel.is_directory_path_exist(annotationPath)();
    if (!isImagesPathExist) {
      setErrorMessage("Images directory path is not exists.")
      return
    }
    if (!isAnnotationPathExist) {
      setErrorMessage("Annotation directory path is not exists.")
      return
    }

    dispatch(setInitialSettingValue({
      initialSettingFinished: true,
      annotationPath: new FilePathWrapper(annotationPath),
      imagesPath: new FilePathWrapper(imagesPath)
    }))
  }

  const onImagesPathChooseClick = async () => {
    const filePath: string | null = await eel.choose_annotation_directory()()
    if (filePath === null) {
      return
    }
    log(filePath)
    setImagesPath(filePath)
  }

  const onAnnotationPathChooseClick = async () => {
    const filePath: string | null = await eel.choose_annotation_directory()()
    if (filePath === null) {
      return
    }
    log(filePath)
    setAnnotationPath(filePath)
  }

  const infoModalProps: InfoModalProps = {
    title: "Result",
    message: infoMessage,
    open: infoMessage !== "",
    onClose: () => { setInfoMessage("") }
  }

  const errorModalProps = {
    title: "Error",
    message: errorMessage,
    open: errorMessage !== "",
    onClose: () => { setErrorMessage("") }
  }

  return (
    <InitialSettingTemplate
      annotationPath={annotationPath}
      imagesPath={imagesPath}
      onAnnotationPathChooseClick={onAnnotationPathChooseClick}
      onImagesPathChooseClick={onImagesPathChooseClick}
      onAnnotationPathChanged={(filePath: string) => setAnnotationPath(filePath)}
      onImagesPathChanged={(filePath: string) => setImagesPath(filePath)}
      labelList={state.labelList}
      onLabelAdded={(labelName: string) => dispatch(addLabelAction(labelName))}
      onLoadLabelClick={onLoadLabelClick}
      onSaveLabelClick={onSaveLabelClick}
      onSubmit={onSubmit}
      infoModalProps={infoModalProps}
      errorModalProps={errorModalProps}
    />
  )
}