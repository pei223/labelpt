import { CircularProgress } from '@material-ui/core'
import React from 'react'

type Props = {
  open: boolean
  size?: number
  backgroundColor?: string
}

const Loading = ({
  open,
  size = 60,
  backgroundColor = 'rgba(0,0,0,0.3)',
}: Props) => {
  return open ? (
    <div
      style={{
        zIndex: 100,
        backgroundColor: backgroundColor,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
      }}>
      <CircularProgress
        color="primary"
        size={size}
        style={{
          position: 'relative',
          top: '45vh',
        }}
      />
    </div>
  ) : (
    <></>
  )
}
export default Loading
