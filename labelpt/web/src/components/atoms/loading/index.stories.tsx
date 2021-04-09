import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'
import Loading from './index'

storiesOf('atoms/Loading', module).add('default', () => (
  <div>
    <p>test</p>
    <Loading open={boolean('open', true)} size={number('size', 50)} />
  </div>
))
