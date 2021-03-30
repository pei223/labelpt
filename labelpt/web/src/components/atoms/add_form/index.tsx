import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  color?: string
  textFieldWidth?: string
  onSubmit: (labelName: string) => void
}


const AddForm = ({ color = "#303f9f", textFieldWidth: width = "150px", onSubmit }: Props) => {
  const [labelName, setLabelName] = useState("")

  const isError = () => {
    return labelName === ""
  }
  return (
    <>
      <TextField
        error={isError()}
        helperText={isError() ? "Must not be empty" : ""}
        type="text" margin="normal" onChange={(e) => setLabelName(e.target.value)} style={{ color: color, width: width }} />
      <Fab onClick={() => { onSubmit(labelName); setLabelName("") }} style={{ backgroundColor: color }} size="small" >
        <AddIcon style={{ color: "white" }} />
      </Fab>
    </>
  )
}
export default AddForm