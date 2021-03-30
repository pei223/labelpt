import { Divider, Fab, ListItem, ListItemText } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  color?: string
  textFieldWidth?: string
  onSubmit: (labelName: string) => void
}

const AddForm = ({ color = "#303f9f", textFieldWidth: width = "150px", onSubmit }: Props) => {
  const [labelName, setLabelName] = useState("")
  return (
    <>
      <TextField type="text" margin="normal" onChange={(e) => setLabelName(e.target.value)} style={{ color: color, width: width }} />
      <Fab onClick={() => { onSubmit(labelName); setLabelName("") }} style={{ backgroundColor: color }} size="small" >
        <AddIcon style={{ color: "white" }} />
      </Fab>
    </>
  )
}
export default AddForm