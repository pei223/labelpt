import { setFilePathList } from '../store/actions'
import { SET_FILEPATH_LIST } from '../store/types'

describe('Action test', () => {
  test('setFilepathList action', () => {
    const action = setFilePathList([])
    expect(action.type).toBe(SET_FILEPATH_LIST)
  })
})
