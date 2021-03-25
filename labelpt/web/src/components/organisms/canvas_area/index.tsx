import React, { useState } from "react"
import Label from "../../../domain/label"
import { AnnotationManager } from "../../../domain/annotation_manager"
import { log } from "../../../utils/logger"
import LabelList, { LabelListProps } from "../../molecules/label_list"
import LayerImage, { ImageInfo } from "../../molecules/layer_image"
import { Grid } from "@material-ui/core"

export type CanvasAreaProps = {
  children: React.ReactChild,
  imageInfo: ImageInfo,
  labelList: Label[],
}

export type InnerCanvasAreaProps = {
  children: React.ReactChild,
  imageInfo: ImageInfo,
  labelList: Label[],
  annotationManager: AnnotationManager
}

const InnerCanvasArea = ({ children, imageInfo, labelList, annotationManager }: InnerCanvasAreaProps) => {
  const [selectedLabel, setSelectedLabel] = useState<Label>(labelList[0])

  const onLabelClick = (label: Label) => {
    setSelectedLabel(label)
    annotationManager.setLabel(label)
  }

  const labelListProps: LabelListProps = {
    onClick: onLabelClick,
    labelList: labelList,
    selectedIndex: selectedLabel.index,
  }

  // TODO ツールボックス含めて描画エリアにする
  return (
    <>
      <Grid item xs={9}>
        <LayerImage imageInfo={imageInfo} annotationManager={annotationManager} />
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LabelList {...labelListProps} height="300px" />
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const propsEqual = (props1: CanvasAreaProps, props2: CanvasAreaProps): boolean => {
  return props1.imageInfo === props2.imageInfo && props1.labelList === props2.labelList
}

const CanvasArea = ({ children, imageInfo, labelList }: CanvasAreaProps) => {
  log("Render on CanvasArea")
  // annotationManagerを保持するためにmemo化してラッピングする
  const annotationManager = new AnnotationManager(imageInfo.width, imageInfo.height)
  return (
    <InnerCanvasArea imageInfo={imageInfo} labelList={labelList} annotationManager={annotationManager} children={children} />
  )
}
export default React.memo(CanvasArea, propsEqual)