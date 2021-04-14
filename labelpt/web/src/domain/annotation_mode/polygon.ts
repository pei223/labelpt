import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode } from './base'

interface Point {
  x: number
  y: number
}

export class PolygonMode extends Mode {
  polygonPoints: Point[] = []

  onMouseDown(x: number, y: number, label: Label): void {
    if (this.isStartPointClicked(x, y)) {
      this.applyPolygonToAnnotation(label)
      this.polygonPoints = []
      this.clearHighlight()
      return
    }
    this.polygonPoints.push({ x: x, y: y })
    this.drawHighLight()
  }

  onMouseMove(x: number, y: number, label: Label): void {
    this.clearHighlight()
    this.drawHighLight()
    this.drawPolygonPoint(
      { x: x, y: y },
      false,
      this.contextSet?.highlightContext
    )
  }

  onMouseUp(x: number, y: number): void {}

  private isStartPointClicked(x: number, y: number) {
    return (
      this.polygonPoints.length > 0 &&
      this.polygonPoints[0].x + this.brushSize > x &&
      this.polygonPoints[0].x - this.brushSize < x &&
      this.polygonPoints[0].y + this.brushSize > y &&
      this.polygonPoints[0].y - this.brushSize < y
    )
  }

  private applyPolygonToAnnotation(label: Label) {
    const context = this.contextSet?.annotationContext
    if (!context) {
      errorLog('annotation context is null.')
      return
    }
    if (this.polygonPoints.length === 0) {
      errorLog('polygon points length is zero')
      return
    }
    context.beginPath()
    context.fillStyle = label.getAnnotationRGBString()
    context.globalCompositeOperation = label.isBackground()
      ? 'destination-out'
      : 'source-over'
    this.polygonPoints.forEach((point) => {
      context.lineTo(point.x, point.y)
    })
    context.lineTo(this.polygonPoints[0].x, this.polygonPoints[0].y)
    context.fill()
    context.closePath()
  }

  private drawHighLight() {
    const context = this.contextSet?.highlightContext
    if (!context) {
      errorLog('highlight context is null.')
      return
    }
    this.clearHighlight()
    this.drawLineBitweenPolygonPoints(context)
    this.drawPolygonPoints(context)
  }

  private drawLineBitweenPolygonPoints(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.lineWidth = this.brushSize / 5 + 1
    this.polygonPoints.forEach((point) => {
      context.lineTo(point.x, point.y)
      context.moveTo(point.x, point.y)
      context.stroke()
    })
    context.closePath()
  }

  private drawPolygonPoints(context: CanvasRenderingContext2D) {
    this.polygonPoints.forEach((point, index) => {
      this.drawPolygonPoint(point, index === 0, context)
    })
  }

  private drawPolygonPoint(
    point: Point,
    isFirstPoint: boolean,
    context?: CanvasRenderingContext2D
  ) {
    if (!context) {
      errorLog('Context is null on drawPolygonPoint.')
      return
    }
    context.beginPath()
    context.globalCompositeOperation = 'source-over'
    context.arc(
      point.x,
      point.y,
      this.brushSize + 1,
      0,
      (360 * Math.PI) / 180,
      false
    )
    context.fillStyle = isFirstPoint ? 'red' : 'black'
    context.fill()
    context.beginPath()
    context.arc(
      point.x,
      point.y,
      this.brushSize - this.brushSize / 3 + 1,
      0,
      (360 * Math.PI) / 180,
      false
    )
    context.fillStyle = 'white'
    context.fill()
  }
}
