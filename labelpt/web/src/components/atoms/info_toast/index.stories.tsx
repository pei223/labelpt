import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import InfoToast from './index'
import { action } from '@storybook/addon-actions'

storiesOf('atoms/InfoToast', module).add('default', () => (
  <InfoToast
    message={text('message', 'Test message')}
    open={boolean('open', true)}
    onClose={() => action('clicked')}
  />
))
