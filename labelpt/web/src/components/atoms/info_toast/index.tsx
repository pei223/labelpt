import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

type Props = {
  message: string
  open: boolean
  onClose: () => void
  hideMilliSec?: number
}

const InfoToast = ({ message, open, onClose, hideMilliSec = 1500 }: Props) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={hideMilliSec}
        open={open}
        onClose={(_, __) => onClose()}>
        <Alert severity="info" variant="filled" elevation={6}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
export default InfoToast
