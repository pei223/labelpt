import React, { useEffect, useState } from 'react'
import Label from '../../../domain/label'
import { AnnotationManager } from '../../../domain/annotation_manager'
import { log } from '../../../utils/logger'
import LabelList, { LabelListProps } from '../../molecules/label_list'
import LayerImage, { ImageInfo } from '../../molecules/layer_image'
import { Box } from '@material-ui/core'
import { PaintMode } from '../../../domain/annotation_mode/paint'

export type CanvasAreaProps = {
  imageInfo: ImageInfo
  labelList: Label[]
  canvasWidth?: string
  canvasHeight?: string
  labelAreaWidth?: string
  labelListHeight?: string
}

export type InnerCanvasAreaProps = {
  imageInfo: ImageInfo
  labelList: Label[]
  annotationManager: AnnotationManager
  canvasWidth: string
  canvasHeight: string
  labelAreaWidth: string
  labelAreaHeight: string
}

const InnerCanvasArea = ({
  imageInfo,
  labelList,
  annotationManager,
  canvasWidth,
  canvasHeight,
  labelAreaWidth,
  labelAreaHeight,
}: InnerCanvasAreaProps) => {
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
      <Box p={1} css={{ height: canvasHeight, width: canvasWidth }}>
        <LayerImage
          imageInfo={imageInfo}
          annotationManager={annotationManager}
          width="auto"
        />
      </Box>
      <Box p={1} css={{ width: labelAreaWidth }}>
        <LabelList {...labelListProps} width="auto" height={labelAreaHeight} />
      </Box>
    </>
  )
}

const propsEqual = (
  props1: CanvasAreaProps,
  props2: CanvasAreaProps
): boolean => {
  return (
    props1.imageInfo === props2.imageInfo &&
    props1.labelList === props2.labelList
  )
}

const CanvasArea = ({
  imageInfo,
  labelList,
  canvasWidth = '600px',
  canvasHeight = '600px',
  labelAreaWidth = '300px',
  labelListHeight: labelAreaHeight = '400px',
}: CanvasAreaProps) => {
  log('Render on CanvasArea')

  const [annotationManager, _] = useState(new AnnotationManager())
  useEffect(() => {
    annotationManager.changeMode(
      new PaintMode(annotationManager.getContextSet(), 5)
    )
  }, [])
  // annotationManagerを保持するためにmemo化してラッピングする
  return (
    <InnerCanvasArea
      imageInfo={imageInfo}
      labelList={labelList}
      annotationManager={annotationManager}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      labelAreaWidth={labelAreaWidth}
      labelAreaHeight={labelAreaHeight}
    />
  )
}
export default React.memo(CanvasArea, propsEqual)
