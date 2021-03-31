import FilePathWrapper from "../domain/filepath_wrapper"
import Label from "../domain/label"
import { ActionType } from "./reducer"

export const SET_FILEPATH_LIST = "SET_FILEPATH_LIST"
export const SET_SELECTED_FILE = "SET_SELECTED_FILE"
export const ADD_LABEL = "ADD_LABEL"
export const SET_LABEL_LIST = "SET_LABEL_LIST"
export const SET_SELECTED_LABEL = "SET_SELECTED_LABEL"
export const SET_INITIAL_SETTING_RESULT = "SET_INITIAL_SETTING_RESULT"


export interface SetFilePathListAction extends ActionType<FilePathWrapper[]> {
  type: string;
  payload: FilePathWrapper[]
}

export interface SetSelectedFileAction extends ActionType<number> {
  type: string;
  payload: number
}

export interface AddLabelAction extends ActionType<string> {
  type: string
  payload: string
}

export interface SetSelectedIndexAction extends ActionType<number> {
  type: string;
  payload: number
}

export interface SetLabelListAction extends ActionType<Label[]> {
  type: string;
  payload: Label[]
}

export interface InitialSetting {
  initialSettingFinished: boolean
  imagesPath: FilePathWrapper
  annotationPath: FilePathWrapper
}

export interface SetInitialSetingAction extends ActionType<InitialSetting> {
  type: string
  payload: InitialSetting
}
