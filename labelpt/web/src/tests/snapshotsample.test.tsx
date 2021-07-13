import React from 'react'
import renderer from 'react-test-renderer'
import LabelItem from '../components/atoms/label_item'
import Label from '../domain/label'

it('Snapshot sample', () => {
  const tree = renderer.create(
    <LabelItem
      width="100px"
      labelInfo={new Label(1, 'test')}
      selected={false}
      onClick={() => {}}
    />
  )

  expect(tree).toMatchSnapshot()
})
