import { Box } from '@material-ui/core'
import React, { useEffect } from 'react'
import FilePathWrapper from '../../../domain/filepath_wrapper'
import { log } from '../../../utils/logger'
import InfoToast from '../../atoms/info_toast'
import Loading from '../../atoms/loading'
import FilePathList from '../../molecules/filepath_list'
import CanvasArea, { CanvasAreaProps } from '../../organisms/canvas_area'

type Props = {
  filePathList: FilePathWrapper[]
  onFileClick: (filePath: FilePathWrapper, index: number) => void
  selectedFileIndex: number
  canvasAreaProps: CanvasAreaProps
  onInfoToastClose: () => void
  onSaveShortcut: () => void
  infoToastMessage?: string
  isLoading: boolean
}

const SegmentationTemplate = ({
  filePathList,
  onFileClick,
  selectedFileIndex,
  canvasAreaProps,
  onInfoToastClose,
  onSaveShortcut,
  infoToastMessage = '',
  isLoading = false,
}: Props) => {
  log('Render on SegmentationTemplate')

  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.ctrlKey) {
      return
    }
    if (event.key === 's') {
      event.preventDefault()
      onSaveShortcut()
    }
  }

  useEffect(() => {
    // selectedFileIndex変更時に再度コールバックを張ることで、コールバック内でstateの最新値を見れる
    // ただ、pages/Segmentationの実装が変わると動かなくなることも
    document.addEventListener('keydown', onKeyDown, false)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [selectedFileIndex])

  // TODO Width: 95%はいけてない
  return (
    <div style={{ width: '100%', height: '900px' }}>
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        p={1}
        css={{ width: '95%', height: '100%' }}>
        <CanvasArea
          {...canvasAreaProps}
          canvasWidth="80%"
          canvasHeight="100%"
          labelAreaWidth="20%"
          labelListHeight="300px"
        />
        <Box p={1} css={{ height: '400px', width: '20%' }}>
          <FilePathList
            filePathList={filePathList}
            onClick={onFileClick}
            selectedIndex={selectedFileIndex}
            width="auto"
            listHeight="400px"
          />
        </Box>
      </Box>
      <InfoToast
        message={infoToastMessage}
        open={infoToastMessage !== ''}
        onClose={onInfoToastClose}
      />
      <Loading open={isLoading} size={120} backgroundColor="rgba(0,0,0,0)" />
    </div>
  )
}
export default SegmentationTemplate
