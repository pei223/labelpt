import { log } from "../utils/logger"
import Label from "./label"

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
  abstract onClicked(x: number, y: number, label: Label): void
  setContextSet(contextSet: ContextSet) {
    this.contextSet = contextSet
  }
  getContext(): ContextSet | null {
    return this.contextSet
  }
}

export class AnnotationManager {
  label: Label
  mode: Mode
  private width: number
  private height: number

  constructor(width: number, height: number) {
    this.mode = new EmptyMode()
    this.label = Label.backgroundLabel()
    this.width = width
    this.height = height
  }

  setSize(width: number, height: number) {
    this.width = width
    this.height = height
  }

  setLabel(label: Label) {
    this.label = label
  }

  changeMode(mode: Mode) {
    this.mode = mode
  }

  setContextSet(contextSet: ContextSet) {
    this.mode.setContextSet(contextSet)
  }

  getAnnotationData(): any {
    // TODO ここでアノテーションデータを返す
    // Eelに送って、加工/保存をする
    return ""
  }
}


export class EmptyMode extends Mode {
  constructor() {
    super(null)
  }

  onMouseDown(x: number, y: number, label: Label): void {
    log(`${x}, ${y}, ${label.index}`)
  }
  onClicked(x: number, y: number, label: Label): void {
  }
}

// TODO PaintModeなどModeをextendsして各描画モードの実装を行う
