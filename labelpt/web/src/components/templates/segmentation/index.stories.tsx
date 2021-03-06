import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SegmentationTemplate from '.'
import FilePathWrapper from '../../../domain/filepath_wrapper'
import Label from '../../../domain/label'
import { CanvasAreaProps } from '../../organisms/canvas_area'
import { AnnotationManager } from '../../../domain/annotation_manager'
import { boolean, text } from '@storybook/addon-knobs'

const onFileClick = (filePathList: FilePathWrapper, index: Number) => {
  action('filepath row clicked')
}
const onClicked = () => action('save clicked')

const filepathList = [
  new FilePathWrapper('dasklfj;dsa/fdjaslkf;/eee.png'),
  new FilePathWrapper('dasklfj;dsa/fdjaslkf;/eee.png'),
  new FilePathWrapper('dasklfj;dsa/fdjaslkf;/eee.png'),
]

const annotationManager = new AnnotationManager()

const canvasAreaProps: CanvasAreaProps = {
  annotationManager: annotationManager,
  imageInfo: {
    fileName: 'test',
    imageSrc: 'https://tadworks.jp/wp-content/uploads/2020/08/profile_icon.png',
    annotationImgSrc: '',
    width: 400,
    height: 400,
  },
  labelList: [
    new Label(0, 'test'),
    new Label(1, 'aaa'),
    new Label(2, 'hoge'),
    new Label(3, 'aaa2'),
    new Label(4, 'aaa3'),
    new Label(5, 'aaa4'),
  ],
  onSaveClick: onClicked,
}

storiesOf('templates/SegmentationTemplate', module).add('default', () => (
  <SegmentationTemplate
    isLoading={boolean('loading', false)}
    onSaveShortcut={action('save shortcut')}
    errorMessage={text('error message', '')}
    onErrorDialogClose={action('error dialog colose')}
    onFileClick={onFileClick}
    filePathList={filepathList}
    selectedFileIndex={1}
    canvasAreaProps={canvasAreaProps}
    onRedoShortcut={() => annotationManager.getMode().redo()}
    onUndoShortcut={() => annotationManager.getMode().undo()}
    infoToastMessage={text('toast message', '')}
    onInfoToastClose={action('close info toast')}
  />
))
