import React from 'react'
import { ReactScreenshotTest } from 'react-screenshot-test'
import LabelItem from '../components/atoms/label_item'
import Label from '../domain/label'

ReactScreenshotTest.create('LabelItem')
  .viewport('Desktop', {
    width: 1024,
    height: 768,
  })
  .viewport('iPhone X', {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  })
  .shoot(
    'main page',
    <LabelItem
      width="120px"
      labelInfo={new Label(1, 'test')}
      selected={false}
      onClick={() => {}}
    />
  )
  .run()
