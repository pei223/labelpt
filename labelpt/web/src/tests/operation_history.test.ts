import HistoryController from '../domain/operation_history'

describe('OperationHistory test', () => {
  test('Redo on Head', () => {
    const historyController = new HistoryController<number>()
    expect(historyController.redo()).toBe(null)
    historyController.pushHistory(1)
    historyController.pushHistory(2)
    historyController.pushHistory(3)
    expect(historyController.redo()).toBe(null)
  })
  test('Undo on tail', () => {
    const historyController = new HistoryController<number>()
    expect(historyController.undo()).toBe(null)
    historyController.pushHistory(1)
    historyController.pushHistory(2)
    historyController.pushHistory(3)
    historyController.undo()
    historyController.undo()
    historyController.undo()
    expect(historyController.undo()).toBe(null)
  })

  test('Undo and redo', () => {
    const historyController = new HistoryController<number>()
    historyController.pushHistory(1)
    historyController.pushHistory(2)
    historyController.pushHistory(3) // [1,2,3o]
    expect(historyController.undo()).toBe(2) // [1,2o,3]
    expect(historyController.redo()).toBe(3) // [1,2,3o]
    expect(historyController.redo()).toBe(null)
  })

  test('Redo on middle', () => {
    const historyController = new HistoryController<number>()
    historyController.pushHistory(1)
    historyController.pushHistory(2)
    historyController.pushHistory(3)
    historyController.pushHistory(4) // [1,2,3,4o]
    historyController.undo() // [1,2,3o,4]
    historyController.undo() // [1,2o,3,4]
    historyController.pushHistory(5) // [1,2,5o]
    expect(historyController.redo()).toBe(null)
    expect(historyController.undo()).toBe(2) // [1,2o,5]
    historyController.undo() // [1o,2,5]
    expect(historyController.undo()).toBe(null)
    expect(historyController.redo()).toBe(2) // [1,2o,5]
    expect(historyController.redo()).toBe(5) // [1,2,5o]
    historyController.undo() // [1,2o,5]
    expect(historyController.undo()).toBe(1) // [1o,2,5]
  })

  test('Undo and redo on boundary', () => {
    const historyController = new HistoryController<number>()
    // [4,...13]
    for (let i = 0; i < 13; i++) {
      historyController.pushHistory(i + 1)
    }
    expect(historyController.redo()).toBe(null)
    expect(historyController.undo()).toBe(12) // [4,...12o, 13]
    expect(historyController.redo()).toBe(13) // [4,...13o]
    for (let i = 0; i < 8; i++) {
      historyController.undo()
    }
    // [4, 5o,...13]
    expect(historyController.undo()).toBe(4) // [4o, 5,...13]
    expect(historyController.undo()).toBe(null)
    for (let i = 0; i < 8; i++) {
      historyController.redo()
    }
    // [4,...12o,13]
    expect(historyController.redo()).toBe(13) // [4,...12,13o]
    expect(historyController.redo()).toBe(null)
  })
})
