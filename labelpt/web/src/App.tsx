import React, { useReducer } from 'react'
import './App.css'
import { AppContext, initialState } from './store/stores'
import { Reducer } from './store/reducer'
import { SegmentationPage } from './containers/pages/segmentation'
import { log } from './utils/logger'
import { InitialSettingPage } from './containers/pages/initial_setting'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import { indigo, teal } from '@material-ui/core/colors'

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: teal[500],
    },
  },
})

function App() {
  log('Render on App')

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
    <MuiThemeProvider theme={appTheme}>
      <AppContext.Provider value={{ state, dispatch }}>
        {state.initialSettingFinished
          ? genAnnotationPage()
          : genInitialSettingPage()}
      </AppContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
