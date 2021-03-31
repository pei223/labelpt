import React from 'react'
import SubHeading from '../../atoms/sub_heading';
import { Divider, Paper } from '@material-ui/core';
import FilePathWrapper from '../../../domain/filepath_wrapper';
import FileRow from '../../atoms/file_row';
import { log } from '../../../utils/logger';

export type FilePathListProps = {
  filePathList: FilePathWrapper[];
  onClick: (filePath: FilePathWrapper, index: number) => void
  width?: string
  listHeight?: string
  selectedIndex: number
}

const FilePathList = ({ filePathList, onClick, width = "400px", listHeight: height = "500px", selectedIndex }: FilePathListProps) => {
  log("Render on FilePathList")
  const filePathRows = filePathList.map((filepath: FilePathWrapper, index: number) => (
    <FileRow key={index} index={index} filePathWrapper={filepath} onClicked={onClick} selected={selectedIndex === index} />
  ))
  return (
    <Paper style={{ "padding": "10px", width: width }}>
      <SubHeading>Files</SubHeading>
      <Divider style={{ "marginTop": "10px" }} />
      <div style={{ overflowY: "scroll", height: height }}>
        {filePathRows}
      </div>
    </Paper>
  )
}
export default FilePathList