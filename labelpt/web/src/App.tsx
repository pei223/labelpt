import React, { useReducer } from 'react';
import './App.css';
import { AppContext, initialState } from './store/stores';
import { Reducer } from './store/reducer';
import { SegmentationPage } from './containers/pages/segmentation';
import { log } from './utils/logger';
import { InitialSettingPage } from './containers/pages/initial_setting';


function App() {
  log("Render on App")

  const [state, dispatch] = useReducer(Reducer, initialState)

  const genAnnotationPage = () => (
    <div className="root-container">
      <SegmentationPage />
    </div>
  )

  const genInitialSettingPage = () => (
    <div className="initial-setting-container">
      <InitialSettingPage />
    </div>
  )

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {state.initialSettingFinished ? genAnnotationPage() : genInitialSettingPage()}
    </AppContext.Provider>
  );
}

export default App;
