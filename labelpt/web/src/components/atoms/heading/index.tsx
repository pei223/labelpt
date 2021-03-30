import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

type Props = {
  children: string,
}

const Heading = ({ children }: Props) => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom={false}>
        {children}
      </Typography>
      <Divider />
    </>
  )
}
export default Heading