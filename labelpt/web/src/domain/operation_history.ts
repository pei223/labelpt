import { log } from '../utils/logger'

const DEFAULT_MAX_HISTORIES = 10

export default class HistoryController<HistoryLog> {
  private historyIndex: number = -1
  private historyLogs: HistoryLog[] = []
  private maxHistories: number

  constructor(maxHistories: number = DEFAULT_MAX_HISTORIES) {
    this.maxHistories = maxHistories
  }

  pushHistory(historyLog: HistoryLog) {
    if (this.isAbleToRedo()) {
      this.removeFutureHistories()
    }
    this.historyLogs.push(historyLog)
    this.historyIndex++
    this.removeSurplusHistories()
    log('HistoryController log: ', this.historyLogs, this.historyIndex)
  }

  undo(): HistoryLog | null {
    if (!this.isAbleToUndo()) {
      return null
    }
    return this.historyLogs[--this.historyIndex]
  }

  redo(): HistoryLog | null {
    if (!this.isAbleToRedo()) {
      return null
    }
    return this.historyLogs[++this.historyIndex]
  }

  clear() {
    this.historyLogs = []
    this.historyIndex = -1
  }

  private isAbleToUndo(): boolean {
    return this.historyLogs.length > 1 && this.historyIndex > 0
  }

  private isAbleToRedo(): boolean {
    return (
      this.historyLogs.length > 0 &&
      this.historyIndex + 1 < this.historyLogs.length
    )
  }

  private removeFutureHistories() {
    this.historyLogs = this.historyLogs.filter(
      (_, index) => this.historyIndex >= index
    )
  }

  private removeSurplusHistories() {
    const surplusHistoryCount = this.historyLogs.length - this.maxHistories
    if (surplusHistoryCount > 0) {
      this.historyLogs.splice(0, surplusHistoryCount)
      this.historyIndex = this.maxHistories - 1
    }
  }
}
