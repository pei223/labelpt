import { errorLog } from '../../utils/logger'
import Label from '../label'
import { Mode, Point } from './base'

export class CircleMode extends Mode {
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
      this.drawBackgroundCircle(
        this.circleCenter.x,
        this.circleCenter.y,
        this.calcDiffToCircleCenter(x, y),
        this.contextSet?.highlightContext
      )
      return
    }
    this.drawCircle(
      this.circleCenter.x,
      this.circleCenter.y,
      this.calcDiffToCircleCenter(x, y),
      label,
      this.contextSet?.highlightContext
    )
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
    this.drawCircle(
      this.circleCenter.x,
      this.circleCenter.y,
      this.calcDiffToCircleCenter(x, y),
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

  private calcDiffToCircleCenter(x: number, y: number): number {
    if (this.circleCenter === null) {
      return 0
    }
    return Math.sqrt(
      (this.circleCenter.x - x) ** 2 + (this.circleCenter.y - y) ** 2
    )
  }
}
