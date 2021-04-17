import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode, Point } from './base'

export class LineMode extends Mode {
  private lineStartPt: Point | null = null
  private selectedLabel: Label | null = null

  onMouseDown(x: number, y: number, label: Label): void {
    this.lineStartPt = { x: x, y: y }
    this.selectedLabel = label
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    if (this.lineStartPt === null) {
      this.drawHighlightLine(x, y, label)
      return
    }
    if (label.isBackground()) {
      this.drawBackgroundLineFromCenter(x, y, this.contextSet?.highlightContext)
      return
    }
    this.drawLineFromCenter(x, y, label, this.contextSet?.highlightContext)
  }

  onMouseUp(x: number, y: number): void {
    if (this.lineStartPt === null) {
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
    this.drawLineFromCenter(
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
    this.lineStartPt = null
  }

  onMouseLeave() {
    if (this.lineStartPt === null) {
      this.clearHighlight()
    }
  }

  private drawHighlightLine(x: number, y: number, label: Label) {
    const context = this.contextSet?.highlightContext
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.lineWidth = this.brushSize * 2
    context.strokeStyle = label.isBackground()
      ? 'black'
      : label.getAnnotationRGBString()
    context.moveTo(x, y - this.brushSize)
    context.lineTo(x, y + this.brushSize)
    context.stroke()
    context.closePath()
  }

  private drawLineFromCenter(
    x: number,
    y: number,
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    if (this.lineStartPt === null) {
      errorLog('lineStartPt is null.')
      return
    }
    context.beginPath()
    context.lineWidth = this.brushSize * 2
    context.strokeStyle = label.getAnnotationRGBString()
    context.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    context.moveTo(this.lineStartPt?.x, this.lineStartPt?.y)
    context.lineTo(x, y)
    context.stroke()
    context.closePath()
    context.globalCompositeOperation = 'source-over'
  }

  private drawBackgroundLineFromCenter(
    x: number,
    y: number,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    if (this.lineStartPt === null) {
      errorLog('lineStartPt is null.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.lineWidth = this.brushSize * 2
    context.strokeStyle = 'white'
    context.moveTo(this.lineStartPt?.x, this.lineStartPt?.y)
    context.lineTo(x, y)
    context.stroke()
    context.strokeStyle = 'black'
    context.lineWidth = this.brushSize * 2 - (this.brushSize * 2) / 5
    context.moveTo(this.lineStartPt?.x, this.lineStartPt?.y)
    context.lineTo(x, y)
    context.stroke()
    context.closePath()
  }
}
