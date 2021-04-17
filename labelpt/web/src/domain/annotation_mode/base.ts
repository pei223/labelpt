import { log, errorLog } from '../../utils/logger'
import Label from '../label'
import HistoryController from '../operation_history'

export interface Point {
  x: number
  y: number
}

export interface ContextSet {
  imageContext: CanvasRenderingContext2D
  annotationContext: CanvasRenderingContext2D
  regionContext: CanvasRenderingContext2D
  highlightContext: CanvasRenderingContext2D
}

export const PAINT_MODE_INDEX = 0
export const POLIGON_MODE_INDEX = 1
export const REGION_MODE_INDEX = 2
export const CIRCLE_MODE_INDEX = 3
export const RECT_MODE_INDEX = 4
export const LINE_MODE_INDEX = 5

export const MODE_INFO_LIST = [
  {
    index: PAINT_MODE_INDEX,
    name: 'Paint',
  },
  {
    index: POLIGON_MODE_INDEX,
    name: 'Polygon',
  },
  {
    index: REGION_MODE_INDEX,
    name: 'Region',
  },
  {
    index: CIRCLE_MODE_INDEX,
    name: 'Circle',
  },
  {
    index: RECT_MODE_INDEX,
    name: 'Rect',
  },
  {
    index: LINE_MODE_INDEX,
    name: 'Line',
  },
]

export abstract class Mode {
  contextSet: ContextSet | null
  brushSize: number
  width: number
  height: number
  protected imageHistoryController: HistoryController<ImageData>

  constructor(
    contextSet: ContextSet | null,
    brushSize: number,
    width: number,
    height: number,
    imageHistoryController: HistoryController<ImageData>
  ) {
    this.contextSet = contextSet
    this.brushSize = brushSize
    this.width = width
    this.height = height
    this.imageHistoryController = imageHistoryController
  }

  abstract onMouseDown(x: number, y: number, label: Label): void

  abstract onMouseUp(x: number, y: number): void

  abstract onMouseMove(x: number, y: number, label: Label): void

  onMouseLeave() {}

  setContextSet(contextSet: ContextSet) {
    this.contextSet = contextSet
  }

  getContextSet(): ContextSet | null {
    return this.contextSet
  }

  setImage(
    imgSrc: string,
    annotationImgSrc: string | null,
    width: number,
    height: number
  ) {
    if (!this.contextSet) {
      return
    }
    this.width = width
    this.height = height
    this.clearHistory()
    this.clearModeParams()
    this.setImageToCanvas(imgSrc, width, height)
    this.setAnnotationImageToCanvas(annotationImgSrc, width, height)
  }

  private setImageToCanvas(imgSrc: string, width: number, height: number) {
    const img = new Image(width, height)
    img.src = imgSrc
    img.onload = () => {
      if (!this.contextSet) {
        errorLog('contextset is null on setImageToCanvas')
        return
      }
      this.contextSet.imageContext.drawImage(img, 0, 0, width, height)
    }
  }

  private setAnnotationImageToCanvas(
    annotationImgSrc: string | null,
    width: number,
    height: number
  ) {
    if (!this.contextSet) {
      return
    }
    this.contextSet.annotationContext.clearRect(0, 0, width, height)
    if (annotationImgSrc === null) {
      log('No annotation image')
      this.imageHistoryController.pushHistory(
        this.contextSet.annotationContext.getImageData(0, 0, width, height)
      )
      return
    }
    const annotationImg = new Image(width, height)
    annotationImg.src = annotationImgSrc
    annotationImg.onload = () => {
      if (!this.contextSet) {
        errorLog('contextset is null on setAnnotationImageToCanvas')
        return
      }
      this.contextSet.annotationContext.drawImage(
        annotationImg,
        0,
        0,
        width,
        height
      )
      this.imageHistoryController.pushHistory(
        this.contextSet.annotationContext.getImageData(0, 0, width, height)
      )
      log('Draw annotation image.')
    }
  }

  setBrushSize(brushSize: number) {
    this.brushSize = brushSize
  }

  undo() {
    const prevImageData = this.imageHistoryController.undo()
    if (prevImageData === null) {
      log('undo image is null')
      return
    }
    log('undo image')
    this.getContextSet()?.annotationContext.putImageData(prevImageData, 0, 0)
  }

  redo() {
    const nextImageData = this.imageHistoryController.redo()
    if (nextImageData === null) {
      log('redo image is null')
      return
    }
    log('redo image')
    this.getContextSet()?.annotationContext.putImageData(nextImageData, 0, 0)
  }

  /**
   * モードの情報をクリアする
   */
  clearModeParams() {
    log('ClearModeParams')
    this.clearHighlight()
  }

  protected clearHistory() {
    log('ClearHistory')
    this.imageHistoryController.clear()
  }

  protected clearHighlight() {
    this.contextSet?.highlightContext.clearRect(0, 0, this.width, this.height)
  }

  protected drawBackgroundCircle(
    x: number,
    y: number,
    rad: number,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null on drawBackgroundHighlightCircle.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'white'
    context.arc(x, y, rad, 0, (360 * Math.PI) / 180, false)
    context.fill()
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, rad - rad / 5 + 1, 0, (360 * Math.PI) / 180, false)
    context.fill()
    context.closePath()
  }

  protected drawCircle(
    x: number,
    y: number,
    rad: number,
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.arc(x, y, rad, 0, (360 * Math.PI) / 180, false)
    context.fillStyle = label.getAnnotationRGBString()
    context.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    context.fill()
    context.closePath()
    context.globalCompositeOperation = 'source-over'
  }
}
