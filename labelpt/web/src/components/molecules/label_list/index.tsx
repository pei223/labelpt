import React from 'react'
import SubHeading from '../../atoms/sub_heading';
import { Divider, Grid, Paper } from '@material-ui/core';
import LabelItem from '../../atoms/label_item';
import Label from '../../../domain/label';

export type LabelListProps = {
  onClick: (label: Label) => void
  labelList: Label[]
  width?: string
  height?: string
  selectedIndex: number
}

const LabelList = ({ onClick, labelList, width = "400px", height = "500px", selectedIndex }: LabelListProps) => {
  const labelRows = labelList.map((labelInfo: Label) => (
    <Grid key={labelInfo.index} item xs={6}>
      <LabelItem labelInfo={labelInfo} onClick={onClick} selected={labelInfo.index === selectedIndex} />
    </Grid>
  ))
  return (
    <Paper style={{ "padding": "10px", width: width}}>
      <SubHeading>Labels</SubHeading>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div style={{ overflowY: "scroll", height: height }}>
        <Grid container spacing={1}>
          {labelRows}
        </Grid>
      </div>
    </Paper>
  )
}
export default LabelList