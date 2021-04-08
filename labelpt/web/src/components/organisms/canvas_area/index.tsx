import React, { useEffect, useRef, useState } from 'react'
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
  onSaveClick: () => void
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
  onSaveClick,
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
  // コールバック内でState値を参照するため、インスタンス変数が必要
  // コールバック内だとStateはコールバック実行時の値から変わらないためuseRefに最新の値を入れる必要がある
  const prevZoomRate = useRef<number>(1.0)

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
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
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
    const highlightLayer = document.getElementById('highlight-layer')
    if (annotatedLayer === null) {
      errorLog('annotatedLayer is null.')
      return
    }
    if (highlightLayer === null) {
      errorLog('highlightLayer is null.')
      return
    }
    setAlpha(alpha)
    annotatedLayer.style.opacity = alpha.toString()
    highlightLayer.style.opacity = alpha.toString()
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

  const changeZoomRate = (newValue: number) => {
    if (newValue > 3.01 || newValue < 0.099) {
      return
    }
    const layerContainer = document.getElementById('layer-container')
    if (layerContainer === null) {
      errorLog('layerContainer is null.')
      return
    }
    layerContainer.style.transform = `scale(${newValue})`
    layerContainer.style.transformOrigin = `left top`
    setZoomRate(newValue)
    prevZoomRate.current = newValue
  }

  const onWheel = (event: WheelEvent) => {
    if (!event.ctrlKey) {
      return
    }
    event.preventDefault()
    let wheelVal = event.deltaY
    wheelVal < 0
      ? changeZoomRate(prevZoomRate.current + 0.1)
      : changeZoomRate(prevZoomRate.current - 0.1)
  }

  return (
    <>
      <Box p={1} css={{ height: canvasHeight, width: canvasWidth }}>
        <LayerImage
          onSaveClick={onSaveClick}
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
          onZoomIn={() => changeZoomRate(zoomRate + 0.1)}
          onZoomOut={() => changeZoomRate(zoomRate - 0.1)}
        />
      </Box>
      <Box p={1} css={{ width: labelAreaWidth }}>
        <LabelList {...labelListProps} width="auto" height={labelAreaHeight} />
      </Box>
    </>
  )
}

export default CanvasArea
