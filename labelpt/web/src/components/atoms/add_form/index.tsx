import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from '@material-ui/core'
import React, { useState } from 'react'

type Props = {
  textFieldWidth?: string
  onSubmit: (labelName: string) => void
}

const AddForm = ({ textFieldWidth: width = '150px', onSubmit }: Props) => {
  const [labelName, setLabelName] = useState('')

  const isError = () => {
    return labelName === ''
  }

  const onPlusClick = () => {
    if (isError()) {
      return
    }
    onSubmit(labelName)
    setLabelName('')
  }

  return (
    <>
      <TextField
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onPlusClick()
          }
        }}
        value={labelName}
        type="text"
        margin="normal"
        onChange={(e) => setLabelName(e.target.value)}
        style={{ width: width }}
      />
      <Fab onClick={onPlusClick} size="small" color="primary">
        <AddIcon />
      </Fab>
    </>
  )
}
export default AddForm
