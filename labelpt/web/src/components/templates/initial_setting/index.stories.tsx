import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import Label from "../../../domain/label";
import InitialSettingTemplate from ".";
import { boolean, text } from "@storybook/addon-knobs";


const labelList = [
  new Label(0, "test"),
  new Label(1, "aaa"),
  new Label(2, "hoge"),
  new Label(3, "aaa2"),
  new Label(4, "aaa3"),
  new Label(5, "aaa4"),
]

const onLabelAdded = (labelName: string) => {
  labelList.push(new Label(labelList.length + 1, labelName))
}

storiesOf('InitialSettingTemplate', module)
  .add('default', () => (
    <InitialSettingTemplate
      imagesPath={text("images path", "test/hoge/aaa")}
      onImagesPathChooseClick={() => { }}
      onImagesPathChanged={(_) => { }}
      annotationPath={text("annotation path", "test/hoge/aaa")}
      onAnnotationPathChooseClick={() => { }}
      onAnnotationPathChanged={(_) => { }}
      labelList={labelList}
      onLabelAdded={onLabelAdded}
      onLoadLabelClick={() => { action("load label") }}
      onSaveLabelClick={() => { action("save label") }}
      onSubmit={action("submit")}
      infoModalProps={{
        title: "title",
        open: boolean("info modal", false),
        message: text("info message", "test"),
        onClose: () => {}
      }}
      errorModalProps={{
        title: "title",
        open: boolean("error modal", false),
        message: text("error message", "test"),
        onClose: () => {}
      }}
    />
  ))