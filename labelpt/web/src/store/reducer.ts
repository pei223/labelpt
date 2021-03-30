import Label from "../domain/label"
import { AppState, NO_INDEX } from "./stores"
import {
    SET_FILEPATH_LIST,
    SET_SELECTED_FILE,
    SET_SELECTED_LABEL,
    SET_LABEL_LIST,
    SET_ANNOTATIONS_PATH,
    ADD_LABEL,
    SET_DIRECTORIES_PATH
} from "./types"


export interface ActionType<T = any> {
    type: string,
    payload: T
}

export const Reducer = (state: AppState, action: ActionType): AppState => {
    switch (action.type) {
        case SET_FILEPATH_LIST:
            return { ...state, filePathList: action.payload }
        case SET_SELECTED_FILE:
            if (action.payload > state.filePathList.length) {
                return state
            }
            return { ...state, selectedFilePathIndex: action.payload }
        case SET_LABEL_LIST:
            return { ...state, labelList: action.payload }
        case ADD_LABEL:
            const newLabelIdx = state.labelList.length
            return { ...state, labelList: [...state.labelList, new Label(newLabelIdx, action.payload)] }
        case SET_SELECTED_LABEL:
            if (action.payload > state.labelList.length) {
                return state
            }
            return { ...state, selectedLabelIndex: action.payload }
        case SET_ANNOTATIONS_PATH:
            return { ...state, saveAnnotationsPath: action.payload }
        case SET_DIRECTORIES_PATH:
            return {
                ...state, saveAnnotationsPath: action.payload.annotationPath,
                imagesPath: action.payload.imagesPath,
                initialSettingFinished: action.payload.initialSettingFinished
            }
        default:
            return state
    }
}
