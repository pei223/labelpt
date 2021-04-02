import { log } from '../utils/logger'
import Label from './label'

export interface ContextSet {
  imageContext: CanvasRenderingContext2D
  annotationContext: CanvasRenderingContext2D
  regionContext: CanvasRenderingContext2D
  highlightContext: CanvasRenderingContext2D
}

export abstract class Mode {
  contextSet: ContextSet | null

  constructor(contextSet: ContextSet | null) {
    this.contextSet = contextSet
  }

  // TODO ここを補強
  abstract onMouseDown(x: number, y: number, label: Label): void

  abstract onMouseMove(x: number, y: number, label: Label): void

  setContextSet(contextSet: ContextSet) {
    this.contextSet = contextSet
  }

  getContext(): ContextSet | null {
    return this.contextSet
  }

  setImage(imgSrc: string, width: number, height: number) {
    if (!this.contextSet) {
      return
    }
    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      if (!this.contextSet) {
        return
      }
      img.width = width
      img.height = height
      this.contextSet.imageContext.drawImage(img, 0, 0, width, height)
    }
  }
}

export class EmptyMode extends Mode {
  constructor() {
    super(null)
  }

  onMouseDown(x: number, y: number, label: Label): void {
    log(`MouseDown: ${x}, ${y}, ${label.index}`)
  }

  onMouseMove(x: number, y: number, label: Label): void {
    log(`MouseOver: ${x}, ${y}, ${label.index}`)
  }
}
// TODO PaintModeなどModeをextendsして各描画モードの実装を行う
