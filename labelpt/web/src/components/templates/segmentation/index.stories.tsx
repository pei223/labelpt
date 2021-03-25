import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import SegmentationTemplate from ".";
import { FilePathListProps } from "../../molecules/filepath_list";
import FilePathWrapper from "../../../domain/filepath_wrapper";
import Label from "../../../domain/label";
import { CanvasAreaProps } from "../../organisms/canvas_area";


const onFileClick = (filePathList: FilePathWrapper, index: Number) => { action("filepath row clicked") }

const filepathList = [
  new FilePathWrapper("dasklfj;dsa/fdjaslkf;/eee.png"),
  new FilePathWrapper("dasklfj;dsa/fdjaslkf;/eee.png"),
  new FilePathWrapper("dasklfj;dsa/fdjaslkf;/eee.png"),
]

const filepathProps: FilePathListProps = {
  onClick: onFileClick,
  filePathList: filepathList,
  height: "400px",
  selectedIndex: 1
}

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

storiesOf('SegmentationTemplate', module)
  .add('default', () => (
    <SegmentationTemplate
      filepathListProps={filepathProps}
      canvasAreaProps={canvasAreaProps} />
  ))