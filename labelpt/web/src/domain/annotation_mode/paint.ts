import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode } from './base'

export class PaintMode extends Mode {
  isMouseDowning = false

  onMouseDown(x: number, y: number, label: Label): void {
    this.isMouseDowning = true
    this.drawCircle(x, y, label)
  }

  onMouseMove(x: number, y: number, label: Label): void {
    if (!this.isMouseDowning) {
      return
    }
    this.drawCircle(x, y, label)
  }

  onMouseUp(x: number, y: number): void {
    this.isMouseDowning = false
  }

  private drawCircle(x: number, y: number, label: Label) {
    const anCtx = this.contextSet?.annotationContext
    if (!anCtx) {
      errorLog('Annotation context is null.')
      return
    }
    anCtx.beginPath()
    anCtx.arc(x, y, this.brushSize, 0, (360 * Math.PI) / 180, false)
    anCtx.fillStyle = label.getAnnotationRGBString()
    anCtx.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    anCtx.fill()
  }
}
