import { Box, Grid } from '@material-ui/core'
import React from 'react'
import FilePathWrapper from '../../../domain/filepath_wrapper'
import { log } from '../../../utils/logger'
import InfoToast from '../../atoms/info_toast'
import FilePathList from '../../molecules/filepath_list'
import CanvasArea, { CanvasAreaProps } from '../../organisms/canvas_area'

type Props = {
  filePathList: FilePathWrapper[]
  onFileClick: (filePath: FilePathWrapper, index: number) => void
  selectedFileIndex: number
  canvasAreaProps: CanvasAreaProps
  onInfoToastClose: () => void
  infoToastMessage?: string
}

const SegmentationTemplate = ({
  filePathList,
  onFileClick,
  selectedFileIndex,
  canvasAreaProps,
  onInfoToastClose,
  infoToastMessage = '',
}: Props) => {
  log('Render on SegmentationTemplate')

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
    </div>
  )
}
export default SegmentationTemplate
