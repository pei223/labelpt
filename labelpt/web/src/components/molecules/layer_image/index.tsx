import { Paper } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { AnnotationManager, ContextSet } from "../../../domain/annotation_manager"
import { errorLog, log } from "../../../utils/logger"
import SubHeading from "../../atoms/sub_heading"

export interface ImageInfo {
  fileName: string,
  imageSrc?: any,
  width: number,
  height: number,
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

const LayerImage = ({ imageInfo, width = "70%", viewHeight = "500px", annotationManager }: ImageProps) => {
  log("Render on LayerImage")

  annotationManager.setSize(imageInfo.width, imageInfo.height)

  const getContext = (id: string): CanvasRenderingContext2D => {
    const canvas: any = document.getElementById(id)
    return canvas.getContext("2d")
  }

  const bindEvent = () => {
    const node = document.getElementById("layer-container")
    if (node === null || node === undefined) {
      errorLog("layer-container not found")
      return
    }
    // TODO 必要なイベントを増やしていく
    node?.addEventListener("mousedown", e => {
      annotationManager.mode.onMouseDown(e.offsetX, e.offsetY, annotationManager.label)
    })
    log("Event binded")
  }

  useEffect(() => {
    log("Set context")
    annotationManager.setContextSet({
      imageContext: getContext("image-layer"),
      annotationContext: getContext("annotated-layer"),
      regionContext: getContext("region-layer"),
      highlightContext: getContext("highlight-layer"),
    })
    bindEvent()
  }, [])

  return (
    <Paper style={{ "padding": "15px", width: width }}>
      <SubHeading>{imageInfo.fileName}</SubHeading>
      <div style={{ overflow: "scroll", height: viewHeight }}>
        <div id="layer-container" style={{ padding: "20px" }}>
          <canvas id="image-layer" />
          <canvas id="region-layer" />
          <canvas id="annotated-layer" />
          <canvas id="highlight-layer" />
          {/* imgは削除予定 */}
          <img src={imageInfo.imageSrc} width={`${imageInfo.width}px`} height={`${imageInfo.height}px`}
            onClick={() => log(annotationManager.label.index)} />
        </div>
      </div>
    </Paper>
  )
}

// TODO 画像情報が変わる以外で再描画はしないようにする
export default React.memo(LayerImage, propsEquals)