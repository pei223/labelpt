import { Divider, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import FilePathWrapper from '../../../domain/filepath_wrapper';
import "./index.css"

type Props = {
    index: number
    filePathWrapper: FilePathWrapper
    onClicked: (filePath: FilePathWrapper, index: number) => void
    selected: boolean
}

const FileRow = ({ index, filePathWrapper, onClicked, selected }: Props) => {
    return (
        <>
            <ListItem button onClick={() => onClicked(filePathWrapper, index)} selected={selected}>
                <ListItemText primary={filePathWrapper.getFileName()} />
            </ListItem>
            <Divider />
        </>
    )
}
export default FileRow