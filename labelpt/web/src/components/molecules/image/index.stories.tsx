import React from "react"
import { storiesOf } from '@storybook/react';
import Image from ".";
import { number, text } from "@storybook/addon-knobs";


storiesOf('Image', module)
  .add('default', () => (
    <Image imageInfo={{
      fileName: text("file name", "test.jpg"),
      imageSrc: text("image url", "https://tadworks.jp/wp-content/uploads/2020/08/profile_icon.png"),
      width: number("width", 400),
      height: number("height", 400),
    }} zoomRate={number("zoom rate", 100)} />
  ))