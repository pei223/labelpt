import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode, Point } from './base'

export class RectMode extends Mode {
  private rectCenter: Point | null = null
  private selectedLabel: Label | null = null

  onMouseDown(x: number, y: number, label: Label): void {
    this.rectCenter = { x: x, y: y }
    this.selectedLabel = label
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    if (this.rectCenter === null) {
      if (label.isBackground()) {
        this.drawBackgroundRect(
          x - this.brushSize / 2,
          y - this.brushSize / 2,
          this.brushSize,
          this.brushSize,
          this.contextSet?.highlightContext
        )
        return
      }
      this.drawRect(
        x - this.brushSize / 2,
        y - this.brushSize / 2,
        this.brushSize,
        this.brushSize,
        label,
        this.contextSet?.highlightContext
      )
      return
    }
    if (label.isBackground()) {
      this.drawBackgroundRect(
        this.rectCenter.x,
        this.rectCenter.y,
        this.calcRectWidth(x, y),
        this.calcRectHeight(x, y),
        this.contextSet?.highlightContext
      )
      return
    }
    this.drawRect(
      this.rectCenter.x,
      this.rectCenter.y,
      this.calcRectWidth(x, y),
      this.calcRectHeight(x, y),
      label,
      this.contextSet?.highlightContext
    )
  }

  onMouseUp(x: number, y: number): void {
    if (this.rectCenter === null) {
      errorLog('Circle center is null onMouseUp')
      return
    }
    if (this.selectedLabel === null) {
      errorLog('selectedLabel is null onMouseUp')
      return
    }
    if (this.contextSet === null) {
      errorLog('context is null onMouseUp')
      return
    }
    this.drawRect(
      this.rectCenter.x,
      this.rectCenter.y,
      this.calcRectWidth(x, y),
      this.calcRectHeight(x, y),
      this.selectedLabel,
      this.contextSet?.annotationContext
    )
    this.imageHistoryController.pushHistory(
      this.contextSet.annotationContext.getImageData(
        0,
        0,
        this.width,
        this.height
      )
    )
    this.selectedLabel = null
    this.rectCenter = null
  }

  onMouseLeave() {
    if (this.rectCenter === null) {
      this.clearHighlight()
    }
  }

  private drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.rect(x, y, width, height)
    context.fillStyle = label.getAnnotationRGBString()
    context.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    context.fill()
    context.closePath()
    context.globalCompositeOperation = 'source-over'
  }

  private drawBackgroundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'black'
    context.rect(x, y, width, height)
    context.fill()
    context.closePath()
  }

  private calcRectWidth(x: number, y: number): number {
    if (this.rectCenter === null) {
      return 0
    }
    const diff = Math.sqrt(
      (this.rectCenter.x - x) ** 2 + (this.rectCenter.y - y) ** 2
    )
    if (x - this.rectCenter.x < 0) {
      return -diff / Math.sqrt(2)
    }
    return diff / Math.sqrt(2)
  }

  private calcRectHeight(x: number, y: number): number {
    if (this.rectCenter === null) {
      return 0
    }
    const diff = Math.sqrt(
      (this.rectCenter.x - x) ** 2 + (this.rectCenter.y - y) ** 2
    )
    if (y - this.rectCenter.y < 0) {
      return -diff / Math.sqrt(2)
    }
    return diff / Math.sqrt(2)
  }
}
