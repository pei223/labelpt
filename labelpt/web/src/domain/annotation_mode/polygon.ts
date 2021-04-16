import { errorLog, log } from '../../utils/logger'
import Label from '../label'
import HistoryController from '../operation_history'
import { Mode } from './base'

interface Point {
  x: number
  y: number
}

const POLYGON_MAX_HISTORIES = 30

export class PolygonMode extends Mode {
  polygonPoints: Point[] = []
  polygonHistoryController: HistoryController<Point[]> = new HistoryController(
    POLYGON_MAX_HISTORIES
  )

  onMouseDown(x: number, y: number, label: Label): void {
    if (this.isStartPointClicked(x, y)) {
      log('Create polygon')
      this.applyPolygonToAnnotation(label)
      this.clearModeParams()
      if (this.contextSet === null) {
        return
      }
      this.imageHistoryController.pushHistory(
        this.contextSet.annotationContext.getImageData(
          0,
          0,
          this.width,
          this.height
        )
      )
      return
    }
    if (this.polygonPoints.length === 0) {
      this.polygonHistoryController.pushHistory([])
    }
    this.polygonPoints.push({ x: x, y: y })
    this.drawHighLight()
    this.polygonHistoryController.pushHistory([...this.polygonPoints])
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

  undo() {
    const prevPolygonPoints = this.polygonHistoryController.undo()
    if (prevPolygonPoints === null) {
      // ポリゴンをすべてundoしたらポリゴン情報をすべて消す
      this.clearModeParams()
      super.undo()
      return
    }
    this.polygonPoints = [...prevPolygonPoints]
    this.drawHighLight()
  }

  redo() {
    const nextPolygonPoints = this.polygonHistoryController.redo()
    if (nextPolygonPoints === null) {
      if (this.polygonPoints.length === 0) {
        super.redo()
      }
      return
    }
    this.polygonPoints = [...nextPolygonPoints]
    this.drawHighLight()
  }

  clearHistory() {
    super.clearHistory()
    this.polygonHistoryController.clear()
  }

  clearModeParams() {
    super.clearModeParams()
    this.polygonHistoryController.clear()
    this.polygonPoints = []
  }

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
    context.globalCompositeOperation = 'source-over'
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
