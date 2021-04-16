import { log, errorLog } from '../../utils/logger'
import Label from '../label'
import HistoryController from '../operation_history'

export interface ContextSet {
  imageContext: CanvasRenderingContext2D
  annotationContext: CanvasRenderingContext2D
  regionContext: CanvasRenderingContext2D
  highlightContext: CanvasRenderingContext2D
}

export const PAINT_MODE_INDEX = 0
export const POLIGON_MODE_INDEX = 1
export const REGION_MODE_INDEX = 2

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
}
