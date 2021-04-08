import React from 'react'
import { storiesOf } from '@storybook/react'
import LayerImage from './index'
import { number, text } from '@storybook/addon-knobs'
import { AnnotationManager } from '../../../domain/annotation_manager'
import { action } from '@storybook/addon-actions'

storiesOf('molecules/LayerImage', module).add('default', () => (
  <LayerImage
    onSaveClick={() => action('Save click')}
    imageInfo={{
      fileName: text('file name', 'test.jpg'),
      imageSrc: text(
        'image url',
        'https://tadworks.jp/wp-content/uploads/2020/08/profile_icon.png'
      ),
      annotationImgSrc: text(
        'annotation url',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonbu.com%2Fillust%2F2941&psig=AOvVaw2R3G8J6iyFihmK9DcHCoVe&ust=1617797553254000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjHvtbL6e8CFQAAAAAdAAAAABAD'
      ),
      width: number('width', 400),
      height: number('height', 400),
    }}
    annotationManager={new AnnotationManager()}
  />
))
