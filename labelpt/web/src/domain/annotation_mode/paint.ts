import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode } from './base'

export class PaintMode extends Mode {
  isMouseDowning = false

  onMouseDown(x: number, y: number, label: Label): void {
    this.isMouseDowning = true
    this.drawCircle(
      x,
      y,
      this.brushSize,
      label,
      this.contextSet?.annotationContext
    )
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    if (label.isBackground()) {
      this.drawBackgroundCircle(
        x,
        y,
        this.brushSize + 1,
        this.contextSet?.highlightContext
      )
    } else {
      this.drawCircle(
        x,
        y,
        this.brushSize,
        label,
        this.contextSet?.highlightContext
      )
    }
    if (!this.isMouseDowning) {
      return
    }
    this.drawCircle(
      x,
      y,
      this.brushSize,
      label,
      this.contextSet?.annotationContext
    )
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
}
