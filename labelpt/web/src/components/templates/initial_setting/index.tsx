import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import Label from '../../../domain/label';
import { NO_INDEX } from '../../../store/stores';
import { log } from '../../../utils/logger';
import AddForm from '../../atoms/add_form';
import FilePathField, { FilePathFieldProps } from '../../atoms/filepath_field';
import Heading from '../../atoms/heading';
import ErrorModal, { ErrorModalProps } from '../../molecules/error_modal';
import InfoModal, { InfoModalProps } from '../../molecules/info_modal';
import LabelList, { LabelListProps } from '../../molecules/label_list';

type Props = {
  themeColor?: string
  annotationPath: string
  onAnnotationPathChooseClick: () => void
  onAnnotationPathChanged: (path: string) => void
  imagesPath: string
  onImagesPathChooseClick: () => void
  onImagesPathChanged: (path: string) => void
  labelList: Label[]
  onLabelAdded: (labelName: string) => void
  onSaveLabelClick: () => void
  onLoadLabelClick: () => void
  onSubmit: (imagesPath: string, annotationPath: string) => void
  errorModalProps: ErrorModalProps
  infoModalProps: InfoModalProps
}

const genButtonStyle = (color: string, width: string): React.CSSProperties => ({
  textTransform: "none",
  backgroundColor: color,
  color: "white",
  width: width
})

const InitialSettingTemplate = ({ themeColor = "#666ad1", annotationPath, onAnnotationPathChooseClick, onAnnotationPathChanged,
  imagesPath, onImagesPathChooseClick, onImagesPathChanged,
  labelList, onLabelAdded, onSaveLabelClick, onLoadLabelClick, onSubmit, infoModalProps, errorModalProps }: Props) => {
  log("Render on InitialSettingTemplate")

  const labelListProps: LabelListProps = {
    height: "400px",
    selectedIndex: NO_INDEX,
    onClick: (label: Label) => { },
    labelList: labelList
  }

  const annotationPathFieldProps: FilePathFieldProps = {
    fieldWidth: "80%",
    label: "Annotation result directory",
    filePath: annotationPath,
    onChange: (filePath: string) => onAnnotationPathChanged(filePath),
    onButtonClick: onAnnotationPathChooseClick,
  }

  const imagesPathFieldProps: FilePathFieldProps = {
    fieldWidth: "80%",
    label: "Images directory",
    filePath: imagesPath,
    onChange: (filePath: string) => onImagesPathChanged(filePath),
    onButtonClick: onImagesPathChooseClick,
  }

  const startAnnotationButton = (
    <Button
      onClick={() => onSubmit(imagesPath, annotationPath)}
      style={{
        paddingTop: "15px",
        paddingBottom: "15px",
        fontSize: "1.2em",
        width: "200px",
        textTransform: "none",
        backgroundColor: themeColor,
        color: "white",
        position: "fixed",
        right: "50px",
        bottom: "50px"
      }}><span>Start annotation</span></Button>
  )

  return (
    <div>
      <Heading>Label Setting</Heading>
      <Grid container spacing={3} style={{ padding: "30px" }}>
        <Grid item xs={6}>
          <AddForm onSubmit={onLabelAdded} textFieldWidth="300px" />
          <LabelList {...labelListProps} width="100%" />
          <Grid container style={{ textAlign: "center", marginTop: "40px" }}>
            <Grid item xs={6}>
              <Button style={genButtonStyle(themeColor, "250px")} onClick={onSaveLabelClick}>Save labels</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={genButtonStyle(themeColor, "250px")} onClick={onLoadLabelClick}>Load labels</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "50px", textAlign: "center" }} spacing={3} justify="center">
          <Grid item xs={12}>
            <FilePathField {...imagesPathFieldProps} />
          </Grid>
          <p style={{ marginBottom: "150px" }}></p>
          <Grid item xs={12}>
            <FilePathField {...annotationPathFieldProps} />
          </Grid>
        </Grid>
      </Grid >
      {startAnnotationButton}
      <InfoModal {...infoModalProps} />
      <ErrorModal {...errorModalProps} />
    </div>
  )
}
export default InitialSettingTemplate
