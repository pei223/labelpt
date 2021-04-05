import Label from './label'
import { Mode, ContextSet } from './annotation_mode/base'
import { EmptyMode } from './annotation_mode/empty'
import { errorLog } from '../utils/logger'

export class AnnotationManager {
  label: Label
  mode: Mode
  zoomLate: number = 1

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

  setImage(imgSrc: string, width: number, height: number) {
    this.mode.setImage(imgSrc, width, height)
  }

  setContextSet(contextSet: ContextSet) {
    this.mode.setContextSet(contextSet)
  }

  getContextSet(): ContextSet | null {
    return this.mode.getContextSet()
  }

  getAnnotationDataArray(): Uint8ClampedArray | null {
    const contextSet = this.mode.getContextSet()
    if (contextSet === null) {
      errorLog('getContext is null on getAnnotationData()')
      return null
    }
    return contextSet.annotationContext.getImageData(
      0,
      0,
      this.mode.width,
      this.mode.height
    ).data
  }

  changeZoomRate(scale: number) {
    this.zoomLate = scale
    const contextSet = this.mode.getContextSet()
    if (contextSet === null) {
      errorLog('ContextSet is null on changeZoomRate')
    }
    const a = contextSet?.annotationContext
    if (a === null) {
      return
    }
    contextSet?.annotationContext.scale(scale, scale)
    contextSet?.imageContext.scale(scale, scale)
    contextSet?.highlightContext.scale(scale, scale)
    contextSet?.regionContext.scale(scale, scale)
  }
}
