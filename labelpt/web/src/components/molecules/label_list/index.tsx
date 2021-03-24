import React from 'react'
import SubHeading from '../../atoms/sub_heading';
import { Divider, Grid, Paper } from '@material-ui/core';
import LabelItem from '../../atoms/label_item';
import Label from '../../../domain/label';

export type LabelListProps = {
  onClick: (label: Label) => void
  labelList: Label[]
  height?: string
  selectedIndex: number
}

const LabelList = ({ onClick, labelList, height = "500px", selectedIndex }: LabelListProps) => {
  const labelRows = labelList.map((labelInfo: Label) => (
    <Grid item xs={6}>
      <LabelItem labelInfo={labelInfo} onClick={onClick} selected={labelInfo.index === selectedIndex} />
    </Grid>
  ))
  return (
    <Paper style={{ "padding": "10px" }}>
      <SubHeading>Labels</SubHeading>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div style={{ overflow: "auto", height: height }}>
        <Grid container spacing={1}>
          {labelRows}
        </Grid>
      </div>
    </Paper>
  )
}
export default LabelList