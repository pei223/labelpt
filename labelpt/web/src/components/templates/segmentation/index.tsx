import { Grid } from '@material-ui/core';
import React from 'react'
import { log } from '../../../utils/logger';
import FilePathList, { FilePathListProps } from '../../molecules/filepath_list';
import CanvasArea, { CanvasAreaProps } from '../../organisms/canvas_area';

type Props = {
  filepathListProps: FilePathListProps
  canvasAreaProps: CanvasAreaProps
}

const SegmentationTemplate = ({ filepathListProps, canvasAreaProps }: Props) => {
  log("Render on SegmentationTemplate")
  return (
    <div>
      <Grid container spacing={3}>
        <CanvasArea {...canvasAreaProps}>
          <FilePathList {...filepathListProps} height="400px" />
        </CanvasArea>
      </Grid>
    </div>
  )
}
export default SegmentationTemplate