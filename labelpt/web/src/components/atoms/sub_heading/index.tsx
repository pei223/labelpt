import React, { CSSProperties } from 'react'
import Typography from '@material-ui/core/Typography'

type Props = {
  children: string
  style?: CSSProperties
}

const SubHeading = ({ children, style }: Props) => {
  return (
    <Typography variant="h5" component="h5" gutterBottom={false} style={style}>
      {children}
    </Typography>
  )
}
export default SubHeading
