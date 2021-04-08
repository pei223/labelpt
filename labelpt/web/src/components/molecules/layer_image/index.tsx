import { Paper } from '@material-ui/core'
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
  width?: string
  viewHeight?: string
  annotationManager: AnnotationManager
}

const propsEquals = (props1: ImageProps, props2: ImageProps): boolean => {
  return props1.imageInfo === props2.imageInfo
}

const LayerImage = ({
  imageInfo,
  width = '70%',
  viewHeight = '500px',
  annotationManager,
}: ImageProps) => {
  log('Render on LayerImage')

  const getContext = (id: string): CanvasRenderingContext2D => {
    const canvas: any = document.getElementById(id)
    return canvas.getContext('2d')
  }

  const bindEvent = () => {
    const node = document.getElementById('layer-container')
    if (node === null || node === undefined) {
      errorLog('layer-container not found')
      return
    }
    // TODO 必要なイベントを増やしていく
    node.addEventListener('mousedown', (e) => {
      annotationManager.mode.onMouseDown(
        e.offsetX,
        e.offsetY,
        annotationManager.label
      )
    })
    node.addEventListener('mousemove', (e) => {
      annotationManager.mode.onMouseMove(
        e.offsetX,
        e.offsetY,
        annotationManager.label
      )
    })
    node.addEventListener('mouseup', (e) => {
      annotationManager.mode.onMouseUp(e.offsetX, e.offsetY)
    })
    node.addEventListener('mouseleave', (e) => {
      annotationManager.mode.onMouseLeave()
    })
    log('Event binded')
  }

  useEffect(() => {
    if (imageInfo.imageSrc === null) {
      // 初回レンダリングのみ起こる可能性あり
      log('src null')
      return
    }
    log('Set context')
    annotationManager.setContextSet({
      imageContext: getContext('image-layer'),
      annotationContext: getContext('annotated-layer'),
      regionContext: getContext('region-layer'),
      highlightContext: getContext('highlight-layer'),
    })
    annotationManager.setImage(
      imageInfo.imageSrc,
      imageInfo.annotationImgSrc,
      imageInfo.width,
      imageInfo.height
    )
    bindEvent()
  }, [imageInfo])

  return (
    <Paper style={{ padding: '15px', width: width }}>
      <SubHeading>{imageInfo.fileName}</SubHeading>
      <div style={{ overflow: 'scroll', height: viewHeight }}>
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
