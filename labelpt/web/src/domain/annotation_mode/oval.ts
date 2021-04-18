import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode, Point } from './base'

export class OvalMode extends Mode {
  private circleCenter: Point | null = null
  private selectedLabel: Label | null = null

  onMouseDown(x: number, y: number, label: Label): void {
    this.circleCenter = { x: x, y: y }
    this.selectedLabel = label
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    if (this.circleCenter === null) {
      if (label.isBackground()) {
        this.drawBackgroundCircle(
          x,
          y,
          this.brushSize,
          this.contextSet?.highlightContext
        )
        return
      }
      this.drawCircle(
        x,
        y,
        this.brushSize,
        label,
        this.contextSet?.highlightContext
      )
      return
    }
    if (label.isBackground()) {
      this.drawHighlightBackgroundOvalFromCenter(
        x,
        y,
        this.contextSet?.highlightContext
      )
      return
    }
    this.drawOvalFromCenter(x, y, label, this.contextSet?.highlightContext)
  }

  onMouseUp(x: number, y: number): void {
    if (this.circleCenter === null) {
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
    this.drawOvalFromCenter(
      x,
      y,
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
    this.circleCenter = null
  }

  onMouseLeave() {
    if (this.circleCenter === null) {
      this.clearHighlight()
    }
  }

  private drawOvalFromCenter(
    x: number,
    y: number,
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    if (this.circleCenter === null) {
      return
    }
    context.beginPath()
    context.ellipse(
      this.circleCenter.x,
      this.circleCenter.y,
      Math.abs(x - this.circleCenter.x),
      Math.abs(y - this.circleCenter.y),
      0,
      0,
      (360 * Math.PI) / 180,
      false
    )
    context.fillStyle = label.getAnnotationRGBString()
    context.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    context.fill()
    context.closePath()
    context.globalCompositeOperation = 'source-over'
  }

  private drawHighlightBackgroundOvalFromCenter(
    x: number,
    y: number,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    if (this.circleCenter === null) {
      return
    }
    context.beginPath()
    context.ellipse(
      this.circleCenter.x,
      this.circleCenter.y,
      Math.abs(x - this.circleCenter.x),
      Math.abs(y - this.circleCenter.y),
      0,
      0,
      (360 * Math.PI) / 180,
      false
    )
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'black'
    context.fill()
    context.closePath()
  }
}
