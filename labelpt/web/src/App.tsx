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
      console.error("no annotations filepath")
      // TODO Error dialog
      return
    }
    console.log(annotationsFilepath)
    dispatch(setAnnotationsPath(new FilePathWrapper(annotationsFilepath)))
  }

  const onLoadLabelClick = async () => {
    const labelList: string[] = await eel.load_labels_from_file()()
    if (labelList === null || labelList === undefined) {
      console.error("no label list")
      // TODO Error dialog
      return
    }
    labelList.splice(0, 0, "background")
    console.log(labelList)
    const labelInfoList: Label[] = labelList.map((labelname: string, index: number) => (new Label(index, labelname)))
    dispatch(setLabelList(labelInfoList))
  }

  const onSaveLabelClick = async () => {
    const result: boolean | null = await eel.save_labels_to_file(state.labelList)()
    if (result === null || result === undefined) {
      console.error("Save label response is null or undefined: " + result)
      // TODO Error dialog
      return
    }
    // TODO 成功モーダル
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppFrame
        onOpenImagesClick={onImagesOpenClick}
        onOpenAnnotationsClick={onOpenAnnotationsClick}
        onLoadLabelClick={onLoadLabelClick}
        onSaveLabelClick={onSaveLabelClick}>
        <Router>
          <Route exact path="/index.html" component={SegmentationPage}></Route>
        </Router>
      </AppFrame>
    </AppContext.Provider>
  );
}

export default App;
