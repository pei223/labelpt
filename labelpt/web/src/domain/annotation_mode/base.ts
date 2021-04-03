import Label from '../label'

export interface ContextSet {
  imageContext: CanvasRenderingContext2D
  annotationContext: CanvasRenderingContext2D
  regionContext: CanvasRenderingContext2D
  highlightContext: CanvasRenderingContext2D
}

export abstract class Mode {
  contextSet: ContextSet | null
  brushSize: number

  constructor(contextSet: ContextSet | null, brushSize: number) {
    this.contextSet = contextSet
    this.brushSize = brushSize
  }

  abstract onMouseDown(x: number, y: number, label: Label): void

  abstract onMouseUp(x: number, y: number): void

  abstract onMouseMove(x: number, y: number, label: Label): void

  setContextSet(contextSet: ContextSet) {
    this.contextSet = contextSet
  }

  getContextSet(): ContextSet | null {
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

  setBrushSize(brushSize: number) {
    this.brushSize = brushSize
  }
}
