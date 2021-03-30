import React from 'react'
import { DialogContent, DialogContentText, DialogTitle, Dialog } from '@material-ui/core';

export type InfoModalProps = {
  title: string
  message: string
  open: boolean
  onClose: () => void
}


const InfoModal = ({ title, message, open, onClose }: InfoModalProps) => {
  return (
    <Dialog
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={() => onClose()}>
      <DialogTitle id="modal-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="modal-description">
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default InfoModal