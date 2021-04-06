import { log } from '../../utils/logger'
import Label from '../label'
import { Mode } from './base'

export class EmptyMode extends Mode {
  constructor() {
    super(null, 1, 0, 0)
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
