import React from 'react'
import Typography from '@material-ui/core/Typography';

type Props = {
    children: string,
}

const SubHeading = ({ children }: Props) => {
    return (
        <Typography variant="h5" component="h5" gutterBottom={false}>
            {children}
        </Typography>
    )
}
export default SubHeading