import { log } from '../../utils/logger'
import Label from '../label'
import HistoryController from '../operation_history'
import { Mode } from './base'

export class EmptyMode extends Mode {
  constructor(imageHistoryController: HistoryController<ImageData>) {
    super(null, 1, 0, 0, imageHistoryController)
  }

  onMouseDown(x: number, y: number, label: Label): void {
    log(`MouseDown: ${x}, ${y}, ${label.index}`)
  }

  onMouseMove(x: number, y: number, label: Label): void {
    log(`MouseOver: ${x}, ${y}, ${label.index}`)
  }

  onMouseUp(x: number, y: number): void {
    log(`MouseUp: ${x}, ${y}`)
  }
}
