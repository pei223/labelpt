import React from 'react'
import { storiesOf } from '@storybook/react'
import ToolBox from './index'
import { number, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('molecules/Toolbox', module).add('default', () => (
  <ToolBox
    width={text('width', '500px')}
    onZoomIn={action('zoom in')}
    onZoomOut={action('zoom out')}
    zoomRate={number('zoom rate', 1.0)}
    alpha={number('alpha', 12)}
    brushSize={number('brush', 12)}
    onAlphaChange={action('on alpha change')}
    onBrushSizeChange={action('on alpha change')}
    modeIndex={0}
    modeValues={[
      {
        index: 0,
        name: 'Paint',
      },
      {
        index: 1,
        name: 'mode2',
      },
    ]}
    onModeIndexChange={action('mode change')}
    onRedo={action('Redo')}
    onUndo={action('Undo')}
  />
))
