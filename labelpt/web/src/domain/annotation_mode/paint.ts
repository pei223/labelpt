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
      this.drawCircle(x, y, label, this.contextSet?.highlightContext)
      return
    }
    this.drawCircle(x, y, label, this.contextSet?.annotationContext)
  }

  onMouseUp(x: number, y: number): void {
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
  }
}
