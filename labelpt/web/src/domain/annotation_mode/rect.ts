import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode, Point } from './base'

export class RectMode extends Mode {
  private rectCenter: Point | null = null
  private selectedLabel: Label | null = null

  onMouseDown(x: number, y: number, label: Label): void {
    this.rectCenter = { x: x, y: y }
    this.selectedLabel = label
    this.drawRect(
      x,
      y,
      this.brushSize,
      label,
      this.contextSet?.highlightContext
    )
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    if (this.rectCenter === null) {
      if (label.isBackground()) {
        this.drawBackgroundRect(
          x,
          y,
          this.brushSize,
          this.contextSet?.highlightContext
        )
        return
      }
      this.drawRect(
        x,
        y,
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
        this.contextSet?.highlightContext
      )
      return
    }
    this.drawRect(
      this.rectCenter.x,
      this.rectCenter.y,
      this.calcRectWidth(x, y),
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
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.rect(x - width / 2, y - width / 2, width, width)
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
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'black'
    context.rect(x - width / 2, y - width / 2, width, width)
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
    return (diff * 2) / Math.sqrt(2)
  }
}
