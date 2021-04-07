import Label from './label'
import { Mode, ContextSet } from './annotation_mode/base'
import { EmptyMode } from './annotation_mode/empty'
import { errorLog } from '../utils/logger'

export class AnnotationManager {
  label: Label
  mode: Mode

  constructor() {
    this.mode = new EmptyMode()
    this.label = Label.backgroundLabel()
  }

  setLabel(label: Label) {
    this.label = label
  }

  changeMode(mode: Mode) {
    this.mode = mode
  }

  setImage(
    imgSrc: string,
    annotationImgSrc: string | null,
    width: number,
    height: number
  ) {
    this.mode.setImage(imgSrc, annotationImgSrc, width, height)
  }

  setContextSet(contextSet: ContextSet) {
    this.mode.setContextSet(contextSet)
  }

  getContextSet(): ContextSet | null {
    return this.mode.getContextSet()
  }

  toBase64Image(node: HTMLCanvasElement | null): string {
    return node === null ? '' : node.toDataURL('image/png').replace(/^.*,/, '')
  }
}
