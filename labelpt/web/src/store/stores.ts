import React from "react";
import FilePathWrapper from "../domain/filepath_wrapper";
import Label from "../domain/label";
import { ActionType } from "./reducer";
export const NO_INDEX = -1

type ContextType = {
    state: AppState;
    dispatch: React.Dispatch<ActionType>;
}

export const AppContext = React.createContext({} as ContextType);

export interface AppState {
    loading: boolean;
    filePathList: FilePathWrapper[]
    selectedFilePathIndex: number
    saveAnnotationsPath: FilePathWrapper | null,
    labelList: Label[]
    selectedLabelIndex: number
}

export const initialState: AppState = {
    loading: false,
    filePathList: [],
    selectedFilePathIndex: NO_INDEX,
    saveAnnotationsPath: null,
    labelList: [new Label(0, "background")],
    selectedLabelIndex: NO_INDEX
}
