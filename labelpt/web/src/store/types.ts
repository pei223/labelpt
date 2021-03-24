import FilePathWrapper from "../domain/filepath_wrapper"
import Label from "../domain/label"
import { ActionType } from "./reducer"

export const SET_FILEPATH_LIST = "SET_FILEPATH_LIST"
export const SET_SELECTED_FILE = "SET_SELECTED_FILE"
export const SET_LABEL_LIST = "SET_LABEL_LIST"
export const SET_SELECTED_LABEL = "SET_SELECTED_LABEL"
export const SET_ANNOTATIONS_PATH = "SET_ANNOTATIONS_PATH"


export interface SetFilePathListAction extends ActionType<FilePathWrapper[]> {
  type: string;
  payload: FilePathWrapper[]
}

export interface SetSelectedFileAction extends ActionType<number> {
  type: string;
  payload: number
}

export interface SetSelectedIndexAction extends ActionType<number> {
  type: string;
  payload: number
}

export interface SetLabelListAction extends ActionType<Label[]> {
  type: string;
  payload: Label[]
}

export interface SetAnnotationsPathAction extends ActionType<FilePathWrapper> {
  type: string
  payload: FilePathWrapper
}