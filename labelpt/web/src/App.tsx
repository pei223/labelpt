import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppContext, initialState } from './store/stores';
import { Reducer } from './store/reducer';
import AppFrame from './components/organisms/appframe';
import { SegmentationPage } from './containers/pages/segmentation';
import { setAnnotationsPath, setFilePathList, setLabelList } from './store/actions';
import FilePathWrapper from './domain/filepath_wrapper';
import { eel } from './eel';
import Label from './domain/label';
import { errorLog, log } from './utils/logger';
import { InitialSettingPage } from './containers/pages/initial_setting';


function App() {
  const [state, dispatch] = useReducer(Reducer, initialState)

  const onImagesOpenClick = async () => {
    const filepathList: string[] = await eel.load_filepath_list()()
    const filePathWrapperList = filepathList.map((filepath: string) =>
      new FilePathWrapper(filepath)
    )
    dispatch(setFilePathList(filePathWrapperList))
  }

  const onOpenAnnotationsClick = async () => {
    const annotationsFilepath: string | null = await eel.choose_annotation_directory()()
    if (annotationsFilepath === null || annotationsFilepath === undefined) {
      errorLog("no annotations filepath")
      // TODO Error dialog
      return
    }
    log(annotationsFilepath)
    dispatch(setAnnotationsPath(new FilePathWrapper(annotationsFilepath)))
  }

  const onLoadLabelClick = async () => {
    const labelList: string[] = await eel.load_labels_from_file()()
    if (labelList === null || labelList === undefined) {
      errorLog("no annotations filepath")
      // TODO Error dialog
      return
    }
    labelList.splice(0, 0, "background")
    log(labelList)
    const labelInfoList: Label[] = labelList.map((labelname: string, index: number) => (new Label(index, labelname)))
    dispatch(setLabelList(labelInfoList))
  }

  const onSaveLabelClick = async () => {
    const result: boolean | null = await eel.save_labels_to_file(state.labelList)()
    if (result === null || result === undefined) {
      errorLog("Save label response is null or undefined: " + result)
      // TODO Error dialog
      return
    }
    // TODO 成功モーダル
  }

  const annotationPage = (
    <div className="root-container">
      <AppFrame
        onOpenImagesClick={onImagesOpenClick}
        onOpenAnnotationsClick={onOpenAnnotationsClick}
        onLoadLabelClick={onLoadLabelClick}
        onSaveLabelClick={onSaveLabelClick}>
        <Router>
          <Route exact path="/index.html" component={SegmentationPage}></Route>
        </Router>
      </AppFrame>
    </div>
  )

  const initialSettingPage = (
    <div className="initial-setting-container">
      <InitialSettingPage />
    </div>
  )

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {state.initialSettingFinished ? annotationPage : initialSettingPage}
    </AppContext.Provider>
  );
}

export default App;
