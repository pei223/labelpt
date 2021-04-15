import Label from './label'
import { Mode, ContextSet } from './annotation_mode/base'
import { EmptyMode } from './annotation_mode/empty'
import HistoryController from './operation_history'
import { log } from '../utils/logger'

const IMAGE_MAX_HISTORIES = 10

export class AnnotationManager {
  private label: Label
  private mode: Mode
  private imageHistoryController: HistoryController<ImageData> = new HistoryController<ImageData>(
    IMAGE_MAX_HISTORIES
  )

  constructor() {
    log('AnnotationManager constructor')
    this.mode = new EmptyMode(this.imageHistoryController)
    this.label = Label.backgroundLabel()
  }

  setLabel(label: Label) {
    this.label = label
  }

  changeMode(mode: Mode) {
    log('Change mode')
    this.mode = mode
    this.mode.clearModeParams()
  }

  changeImage(
    imgSrc: string,
    annotationImgSrc: string | null,
    width: number,
    height: number
  ) {
    log('Change image')
    this.mode.setImage(imgSrc, annotationImgSrc, width, height)
    this.mode.clearModeParams()
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

  getMode(): Mode {
    return this.mode
  }

  getLabel(): Label {
    return this.label
  }

  getImageHistoryController(): HistoryController<ImageData> {
    return this.imageHistoryController
  }
}
