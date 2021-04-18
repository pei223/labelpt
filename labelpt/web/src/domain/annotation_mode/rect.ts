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
      this.drawSquare(
        x,
        y,
        this.brushSize,
        label.isBackground() ? 'black' : label.getAnnotationRGBString(),
        this.contextSet?.highlightContext
      )
      return
    }
    if (label.isBackground()) {
      this.drawBackgroundRect(x, y, this.contextSet?.highlightContext)
      return
    }
    this.drawRectFromCenter(x, y, label, this.contextSet?.highlightContext)
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
      errorLog('Context is null.')
      return
    }
    this.drawRectFromCenter(
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
    this.rectCenter = null
  }

  onMouseLeave() {
    if (this.rectCenter === null) {
      this.clearHighlight()
    }
  }

  private drawRectFromCenter(
    x: number,
    y: number,
    label: Label,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    if (this.rectCenter === null) {
      errorLog('RectCenter is null')
      return
    }
    context.beginPath()
    context.rect(
      this.rectCenter.x,
      this.rectCenter.y,
      x - this.rectCenter.x,
      y - this.rectCenter.y
    )
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
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    if (this.rectCenter === null) {
      errorLog('RectCenter is null')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = 'black'
    context.rect(
      this.rectCenter.x,
      this.rectCenter.y,
      x - this.rectCenter.x,
      y - this.rectCenter.y
    )
    context.fill()
    context.closePath()
  }

  private drawSquare(
    x: number,
    y: number,
    width: number,
    color: string,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null.')
      return
    }
    context.beginPath()
    context.rect(x - width / 2, y - width / 2, width, width)
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = color
    context.fill()
    context.closePath()
  }
}
