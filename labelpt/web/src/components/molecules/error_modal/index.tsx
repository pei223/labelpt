import React from 'react'
import { DialogContent, DialogContentText, DialogTitle, Dialog, Grid } from '@material-ui/core';
import { Warning } from '@material-ui/icons';

export type ErrorModalProps = {
  title: string
  message: string
  open: boolean
  onClose: () => void
}


const ErrorModal = ({ title, message, open, onClose }: ErrorModalProps) => {
  return (
    <Dialog
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={() => onClose()}>
      <DialogTitle id="modal-title">
        <Warning fontSize="large" style={{ color: "red", verticalAlign: "middle" }} />
        &nbsp;&nbsp;&nbsp;{title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="modal-description">
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorModal