import React from 'react'
import SubHeading from '../../atoms/sub_heading';
import { Divider, Paper } from '@material-ui/core';
import FilePathWrapper from '../../../domain/filepath_wrapper';
import FileRow from '../../atoms/file_row';

export type FilePathListProps = {
  filePathList: FilePathWrapper[];
  onClick: (filePath: FilePathWrapper, index: number) => void
  height?: string
  selectedIndex: number
}

const FilePathList = ({ filePathList, onClick, height = "500px", selectedIndex }: FilePathListProps) => {
  const filePathRows = filePathList.map((filepath: FilePathWrapper, index: number) => (
    <FileRow index={index} filePathWrapper={filepath} onClicked={onClick} selected={selectedIndex === index} />
  ))
  return (
    <Paper style={{ "padding": "10px" }}>
      <SubHeading>Files</SubHeading>
      <Divider style={{ "marginTop": "10px" }} />
      <div style={{ overflowY: "scroll", height: height }}>
        {filePathRows}
      </div>
    </Paper>
  )
}
export default FilePathList