import { Grid } from '@material-ui/core';
import React from 'react'
import FilePathWrapper from '../../../domain/filepath_wrapper';
import { log } from '../../../utils/logger';
import FilePathList from '../../molecules/filepath_list';
import CanvasArea, { CanvasAreaProps } from '../../organisms/canvas_area';

type Props = {
  filePathList: FilePathWrapper[];
  onFileClick: (filePath: FilePathWrapper, index: number) => void
  selectedFileIndex: number
  canvasAreaProps: CanvasAreaProps
}

const SegmentationTemplate = ({ filePathList, onFileClick, selectedFileIndex, canvasAreaProps }: Props) => {
  log("Render on SegmentationTemplate")

  // TODO CanvasAreaの更新がReact.memoでかからない
  // そうするとFilePathListもかからなくなってしまう
  // そのため、ファイルリストが取得できない
  return (
    <div>
      <Grid container spacing={3}>
        <CanvasArea {...canvasAreaProps}>
          <FilePathList
            filePathList={filePathList}
            onClick={onFileClick}
            selectedIndex={selectedFileIndex}
            height="400px" />
        </CanvasArea>
      </Grid>
    </div>
  )
}
export default SegmentationTemplate