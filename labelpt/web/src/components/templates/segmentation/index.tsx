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
  // TODO レイアウトおかしい. 後で修正
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CanvasArea {...canvasAreaProps} />
        </Grid>
        <Grid item xs={3}>
          <FilePathList {...filepathListProps} />
        </Grid>
      </Grid>
    </div>
  )
}
export default SegmentationTemplate