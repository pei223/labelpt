import { Grid } from '@material-ui/core';
import React from 'react'
import FilePathList, { FilePathListProps } from '../../molecules/filepath_list';
import Image, { ImageProps } from '../../molecules/image';
import LabelList, { LabelListProps } from '../../molecules/label_list';

type Props = {
  filepathListProps: FilePathListProps
  labelListProps: LabelListProps
  imageProps: ImageProps
}

const SegmentationTemplate = ({ filepathListProps, labelListProps, imageProps }: Props) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Image {...imageProps} />
        </Grid>
        <Grid item xs={3}>
          <LabelList {...labelListProps} height="300px" />
          <p style={{marginTop: "10px"}}></p>
          <FilePathList {...filepathListProps} />
        </Grid>
      </Grid>
    </div>
  )
}
export default SegmentationTemplate