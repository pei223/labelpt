import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

type Props = {
  message: string
  open: boolean
  onClose: () => void
}

const InfoToast = ({ message, open, onClose }: Props) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={500}
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
