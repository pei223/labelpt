import React from "react"
import { storiesOf } from '@storybook/react';
import Label from "../../../domain/label";
import CanvasArea, { CanvasAreaProps } from "../../organisms/canvas_area";



const canvasAreaProps: CanvasAreaProps = {
  imageInfo: {
    fileName: "test",
    imageSrc: "https://tadworks.jp/wp-content/uploads/2020/08/profile_icon.png",
    width: 400,
    height: 400,
  },
  labelList: [
    new Label(0, "test"),
    new Label(1, "aaa"),
    new Label(2, "hoge"),
    new Label(3, "aaa2"),
    new Label(4, "aaa3"),
    new Label(5, "aaa4"),
  ]
}

storiesOf('organisms/CanvasArea', module)
  .add('default', () => (
    <CanvasArea {...canvasAreaProps} />
  ))