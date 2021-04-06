import Label from '../label'

export interface ContextSet {
  imageContext: CanvasRenderingContext2D
  annotationContext: CanvasRenderingContext2D
  regionContext: CanvasRenderingContext2D
  highlightContext: CanvasRenderingContext2D
}

export const PAINT_MODE_INDEX = 0
export const POLIGON_MODE_INDEX = 1
export const REGION_MODE_INDEX = 2

export abstract class Mode {
  contextSet: ContextSet | null
  brushSize: number
  width: number
  height: number

  constructor(
    contextSet: ContextSet | null,
    brushSize: number,
    width: number,
    height: number
  ) {
    this.contextSet = contextSet
    this.brushSize = brushSize
    this.width = width
    this.height = height
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
      this.width = width
      this.height = height
      this.contextSet.imageContext.drawImage(img, 0, 0, width, height)
      const emptyImage = this.contextSet.annotationContext.createImageData(
        width,
        height
      )
      this.contextSet.annotationContext.putImageData(emptyImage, width, height)
    }
  }

  setBrushSize(brushSize: number) {
    this.brushSize = brushSize
  }
}
