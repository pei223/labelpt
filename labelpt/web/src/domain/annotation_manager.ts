import Label from './label'
import { ContextSet, EmptyMode, Mode } from './annotation_mode'

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

  setImage(imgSrc: string, width: number, height: number) {
    this.mode.setImage(imgSrc, width, height)
  }

  setContextSet(contextSet: ContextSet) {
    this.mode.setContextSet(contextSet)
  }

  getAnnotationData(): any {
    // TODO ここでアノテーションデータを返す
    // Eelに送って、加工/保存をする
    return ''
  }
}
