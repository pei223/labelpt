import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode } from './base'

export class PaintMode extends Mode {
  isMouseDowning = false

  onMouseDown(x: number, y: number, label: Label): void {
    this.isMouseDowning = true
    this.drawCircle(x, y, label, this.contextSet?.annotationContext)
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    if (!this.isMouseDowning) {
      if (label.isBackground()) {
        this.drawBackgroundHighlightCircle(x, y)
        return
      }
      this.drawCircle(x, y, label, this.contextSet?.highlightContext)
      return
    }
    this.drawCircle(x, y, label, this.contextSet?.annotationContext)
  }

  onMouseUp(x: number, y: number): void {
    if (this.isMouseDowning && this.contextSet !== null) {
      this.imageHistoryController.pushHistory(
        this.contextSet.annotationContext.getImageData(
          0,
          0,
          this.width,
          this.height
        )
      )
    }
    this.isMouseDowning = false
  }

  onMouseLeave() {
    this.clearHighlight()
  }

  private drawCircle(
    x: number,
    y: number,
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.arc(x, y, this.brushSize, 0, (360 * Math.PI) / 180, false)
    context.fillStyle = label.getAnnotationRGBString()
    context.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    context.fill()
    context.closePath()
    context.globalCompositeOperation = 'source-over'
  }

  private drawBackgroundHighlightCircle(x: number, y: number) {
    const context = this.contextSet?.highlightContext
    if (!context) {
      errorLog('Context is null on drawBackgroundHighlightCircle.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'white'
    context.arc(x, y, this.brushSize + 1, 0, (360 * Math.PI) / 180, false)
    context.fill()
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(
      x,
      y,
      this.brushSize - this.brushSize / 3 + 1,
      0,
      (360 * Math.PI) / 180,
      false
    )
    context.fill()
    context.closePath()
  }
}
