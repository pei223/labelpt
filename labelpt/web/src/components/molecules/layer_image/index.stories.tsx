import React from "react"
import { storiesOf } from '@storybook/react';
import LayerImage from "./index";
import { number, text } from "@storybook/addon-knobs";
import { AnnotationManager } from "../../../domain/annotation_manager";


storiesOf('molecules/LayerImage', module)
  .add('default', () => (
    <LayerImage imageInfo={{
      fileName: text("file name", "test.jpg"),
      imageSrc: text("image url", "https://tadworks.jp/wp-content/uploads/2020/08/profile_icon.png"),
      width: number("width", 400),
      height: number("height", 400),
    }} annotationManager={new AnnotationManager(400, 400)} />
  ))