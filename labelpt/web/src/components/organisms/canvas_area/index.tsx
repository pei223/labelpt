import React, { useEffect, useState } from 'react'
import Label from '../../../domain/label'
import { AnnotationManager } from '../../../domain/annotation_manager'
import { errorLog, log } from '../../../utils/logger'
import LabelList, { LabelListProps } from '../../molecules/label_list'
import LayerImage, { ImageInfo } from '../../molecules/layer_image'
import { Box } from '@material-ui/core'
import { PaintMode } from '../../../domain/annotation_mode/paint'
import ToolBox from '../toolbox'
import {
  PAINT_MODE_INDEX,
  POLIGON_MODE_INDEX,
  REGION_MODE_INDEX,
} from '../../../domain/annotation_mode/base'

export type CanvasAreaProps = {
  annotationManager: AnnotationManager
  imageInfo: ImageInfo
  labelList: Label[]
  canvasWidth?: string
  canvasHeight?: string
  labelAreaWidth?: string
  labelListHeight?: string
}

const DEFAULT_BRUSH_SIZE = 10
const DEFAULT_ALPHA = 0.5

const modes = [
  {
    index: PAINT_MODE_INDEX,
    name: 'paint',
  },
  {
    index: POLIGON_MODE_INDEX,
    name: 'poligon',
  },
  {
    index: REGION_MODE_INDEX,
    name: 'region',
  },
]

const CanvasArea = ({
  annotationManager,
  imageInfo,
  labelList,
  canvasWidth = '600px',
  canvasHeight = '600px',
  labelAreaWidth = '300px',
  labelListHeight: labelAreaHeight = '400px',
}: CanvasAreaProps) => {
  log('Render on CanvasArea')

  const [selectedLabel, setSelectedLabel] = useState<Label>(labelList[0])
  const [alpha, setAlpha] = useState<number>(DEFAULT_ALPHA)
  const [brushSize, setBrushSize] = useState<number>(DEFAULT_BRUSH_SIZE)
  const [modeIndex, setModeIndex] = useState<number>(0)
  const [zoomRate, setZoomRate] = useState<number>(1.0)

  useEffect(() => {
    annotationManager.changeMode(
      new PaintMode(
        annotationManager.getContextSet(),
        brushSize,
        imageInfo.width,
        imageInfo.height
      )
    )
    onAlphaChange(alpha)
  }, [])

  const onLabelClick = (label: Label) => {
    setSelectedLabel(label)
    annotationManager.setLabel(label)
  }

  const labelListProps: LabelListProps = {
    onClick: onLabelClick,
    labelList: labelList,
    selectedIndex: selectedLabel.index,
  }

  const onAlphaChange = (alpha: number) => {
    // NOTE React外で直接DOMいじるのは良くないが現状これしか方法なし
    const annotatedLayer = document.getElementById('annotated-layer')
    if (annotatedLayer === null) {
      errorLog('annotatedLayer is null.')
      return
    }
    setAlpha(alpha)
    annotatedLayer.style.opacity = alpha.toString()
  }

  const onModeIndexChange = (modeIndex: number) => {
    // TODO モード増やしたらここでchangeMode追加
    const prevMode = annotationManager.mode
    if (modeIndex === PAINT_MODE_INDEX) {
      annotationManager.changeMode(
        new PaintMode(
          prevMode.contextSet,
          prevMode.brushSize,
          prevMode.width,
          prevMode.height
        )
      )
    }
    setModeIndex(modeIndex)
  }

  const onBrushSizeChange = (brushSize: number) => {
    setBrushSize(brushSize)
    annotationManager.mode.setBrushSize(brushSize)
  }

  const changeZoomRate = (diff: number) => {
    if (zoomRate >= 3.0 || zoomRate <= 0.11) {
      return
    }
    // TODO 画像・アノテ結果などのズーム
    setZoomRate(zoomRate + diff)
  }

  return (
    <>
      <Box p={1} css={{ height: canvasHeight, width: canvasWidth }}>
        <LayerImage
          imageInfo={imageInfo}
          annotationManager={annotationManager}
          width="auto"
          viewHeight="536px"
        />
        <div style={{ paddingTop: '8px' }}></div>
        <ToolBox
          width="auto"
          alpha={alpha}
          onAlphaChange={onAlphaChange}
          brushSize={brushSize}
          onBrushSizeChange={onBrushSizeChange}
          onModeIndexChange={onModeIndexChange}
          modeIndex={modeIndex}
          modeValues={modes}
          zoomRate={zoomRate}
          onZoomIn={() => changeZoomRate(0.1)}
          onZoomOut={() => changeZoomRate(-0.1)}
        />
      </Box>
      <Box p={1} css={{ width: labelAreaWidth }}>
        <LabelList {...labelListProps} width="auto" height={labelAreaHeight} />
      </Box>
    </>
  )
}

export default CanvasArea
