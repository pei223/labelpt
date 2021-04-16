import { Button, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import { AnnotationManager } from '../../../domain/annotation_manager'
import { errorLog, log } from '../../../utils/logger'
import SubHeading from '../../atoms/sub_heading'
import './index.css'

export interface ImageInfo {
  fileName: string
  imageSrc: string | null
  annotationImgSrc: string | null
  width: number
  height: number
}

export type ImageProps = {
  imageInfo: ImageInfo
  onSaveClick: () => void
  width?: string
  viewHeight?: string
  annotationManager: AnnotationManager
}

const propsEquals = (props1: ImageProps, props2: ImageProps): boolean => {
  return props1.imageInfo === props2.imageInfo
}

const getContext = (id: string): CanvasRenderingContext2D => {
  const canvas: any = document.getElementById(id)
  return canvas.getContext('2d')
}

const LayerImage = ({
  imageInfo,
  onSaveClick,
  width = '70%',
  viewHeight = '500px',
  annotationManager,
}: ImageProps) => {
  log('Render on LayerImage')

  const onMouseDown = (e: MouseEvent) => {
    annotationManager
      .getMode()
      .onMouseDown(e.offsetX, e.offsetY, annotationManager.getLabel())
  }
  const onMouseMove = (e: MouseEvent) => {
    annotationManager
      .getMode()
      .onMouseMove(e.offsetX, e.offsetY, annotationManager.getLabel())
  }
  const onMouseUp = (e: MouseEvent) => {
    annotationManager.getMode().onMouseUp(e.offsetX, e.offsetY)
  }
  const onMouseLeave = (e: MouseEvent) => {
    annotationManager.getMode().onMouseLeave()
  }

  const bindEvent = () => {
    const node = document.getElementById('layer-container')
    if (node === null || node === undefined) {
      errorLog('layer-container not found')
      return
    }
    node.addEventListener('mousedown', onMouseDown)
    node.addEventListener('mousemove', onMouseMove)
    node.addEventListener('mouseup', onMouseUp)
    node.addEventListener('mouseleave', onMouseLeave)
  }

  const unBindEvent = () => {
    const node = document.getElementById('layer-container')
    if (node === null || node === undefined) {
      errorLog('layer-container not found')
      return
    }
    node.removeEventListener('mousedown', onMouseDown)
    node.removeEventListener('mousemove', onMouseMove)
    node.removeEventListener('mouseup', onMouseUp)
    node.removeEventListener('mouseleave', onMouseLeave)
  }

  useEffect(() => {
    if (imageInfo.imageSrc === null) {
      // 初回レンダリングのみ起こる可能性あり
      log('src null')
      return
    }
    annotationManager.setContextSet({
      imageContext: getContext('image-layer'),
      annotationContext: getContext('annotated-layer'),
      regionContext: getContext('region-layer'),
      highlightContext: getContext('highlight-layer'),
    })
    annotationManager.changeImage(
      imageInfo.imageSrc,
      imageInfo.annotationImgSrc,
      imageInfo.width,
      imageInfo.height
    )
    bindEvent()
    return () => unBindEvent()
  }, [imageInfo])

  return (
    <Paper style={{ padding: '15px', width: width }}>
      <div>
        <SubHeading style={{ display: 'inline' }}>
          {imageInfo.fileName}
        </SubHeading>
        <Button
          variant="contained"
          color="primary"
          onClick={onSaveClick}
          style={{ float: 'right', marginRight: '20px' }}>
          Save
        </Button>
      </div>
      <div
        style={{
          overflow: 'scroll',
          height: viewHeight,
          clear: 'both',
          marginTop: '20px',
        }}>
        <div id="layer-container" className="layer-container">
          <canvas
            className="annotation-image-layer"
            id="image-layer"
            width={imageInfo.width}
            height={imageInfo.height}
          />
          <div id="region-layer-wrapper" className="layer-wrapper">
            <canvas
              id="region-layer"
              className="annotation-image-layer"
              width={imageInfo.width}
              height={imageInfo.height}
            />
          </div>
          <div id="annotated-layer-wrapper" className="layer-wrapper">
            <canvas
              id="annotated-layer"
              className="annotation-image-layer"
              width={imageInfo.width}
              height={imageInfo.height}
            />
          </div>
          <div id="highlight-layer-wrapper" className="layer-wrapper">
            <canvas
              id="highlight-layer"
              width={imageInfo.width}
              height={imageInfo.height}
            />
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default React.memo(LayerImage, propsEquals)
