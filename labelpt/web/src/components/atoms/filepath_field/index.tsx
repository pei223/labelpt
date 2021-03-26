import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import React from 'react';

type Props = {
  color?: string
  label: string
  filePath: string
  onChange: (filePath: string) => void
  onButtonClick: (filePath: string) => void
}

const FilePathField = ({ color = "#303f9f", label, filePath, onChange, onButtonClick }: Props) => {
  return (
    <>
      <TextField type="text" margin="none" label={label}
        onChange={(e) => { onChange(e.target.value) }} value={filePath}
        style={{ color: color, verticalAlign: "bottom" }} />
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