import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import React from 'react';
import { log } from '../../../utils/logger';

export type FilePathFieldProps = {
  color?: string
  label?: string
  fieldWidth?: string
  filePath: string
  onChange: (filePath: string) => void
  onButtonClick: (filePath: string) => void
}

const FilePathField = ({ color = "#303f9f", label = "file path", fieldWidth = "200px", filePath, onChange, onButtonClick }: FilePathFieldProps) => {
  log("Render on FilePathField")
  return (
    <>
      <TextField type="text" margin="none" label={label}
        defaultValue={filePath}
        onChange={(e) => { onChange(e.target.value) }} value={filePath}
        style={{ color: color, verticalAlign: "bottom", width: fieldWidth }} />
      <Button
        size="small"
        onClick={(e) => onButtonClick(filePath)} style={{
          backgroundColor: color,
          // verticalAlign: "center",
          paddingLeft: "10px", paddingRight: "10px",
          minWidth: "0px"
        }}>
        <span style={{ color: "white" }}>...&nbsp;</span>
      </Button>
    </>
  )
}
export default FilePathField