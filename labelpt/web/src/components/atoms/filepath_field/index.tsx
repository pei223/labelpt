import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import React from 'react'
import { log } from '../../../utils/logger'

export type FilePathFieldProps = {
  label?: string
  fieldWidth?: string
  filePath: string
  onChange: (filePath: string) => void
  onButtonClick: (filePath: string) => void
}

const FilePathField = ({
  label = 'file path',
  fieldWidth = '200px',
  filePath,
  onChange,
  onButtonClick,
}: FilePathFieldProps) => {
  log('Render on FilePathField')

  const isError = () => {
    return filePath === ''
  }

  return (
    <>
      <TextField
        error={isError()}
        margin="none"
        type="text"
        label={label}
        defaultValue={filePath}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        value={filePath}
        style={{ verticalAlign: 'top', width: fieldWidth }}
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={(e) => onButtonClick(filePath)}
        style={{
          verticalAlign: 'bottom',
          paddingLeft: '10px',
          paddingRight: '10px',
          minWidth: '0px',
        }}>
        ...&nbsp;
      </Button>
    </>
  )
}
export default FilePathField
