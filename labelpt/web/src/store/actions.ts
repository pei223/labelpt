import FilePathWrapper from "../domain/filepath_wrapper";
import Label from "../domain/label";
import { NO_INDEX } from "./stores";
import {
  SET_FILEPATH_LIST,
  SET_SELECTED_FILE,
  SET_LABEL_LIST,
  SET_SELECTED_LABEL,
  ADD_LABEL,
  SET_INITIAL_SETTING_RESULT,
  SetFilePathListAction,
  SetSelectedFileAction,
  SetSelectedIndexAction,
  SetLabelListAction,
  AddLabelAction,
  InitialSetting,
  SetInitialSetingAction,
} from "./types";


export const setFilePathList = (filepathList: FilePathWrapper[]): SetFilePathListAction => {
  return {
    type: SET_FILEPATH_LIST,
    payload: filepathList
  }
}

export const setSelectedFile = (index: number): SetSelectedFileAction => {
  if (index < NO_INDEX) {
    throw RangeError("File index must be > 0")
  }
  return {
    type: SET_SELECTED_FILE,
    payload: index
  }
}

export const addLabelAction = (labelName: string): AddLabelAction => {
  return {
    type: ADD_LABEL,
    payload: labelName,
  }
}

export const setSelectedLabel = (index: number): SetSelectedIndexAction => {
  if (index < NO_INDEX) {
    throw RangeError("Label must be > 0")
  }
  return {
    type: SET_SELECTED_LABEL,
    payload: index
  }
}

export const setLabelList = (labelList: Label[]): SetLabelListAction => {
  if (labelList.length < 1 || labelList.length > 255) {
    throw RangeError("Label list length must be 1 ~ 255")
  }
  return {
    type: SET_LABEL_LIST,
    payload: labelList
  }
}

export const setInitialSettingValue = (initialSetting: InitialSetting): SetInitialSetingAction => {
  return {
    type: SET_INITIAL_SETTING_RESULT,
    payload: initialSetting
  }
}
