import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from "@storybook/addon-knobs";
import FileRow from './index'
import FilePathWrapper from "../../../domain/filepath_wrapper";


storiesOf('atoms/FileRow', module)
  .add('default', () => (
    <FileRow
      selected={false}
      index={1}
      filePathWrapper={new FilePathWrapper(text("file path", "aaa/test/test.png"))}
      onClicked={action(`clicked`)} />
  )).add('long filename', () => (
    <FileRow
      selected={false}
      index={2}
      filePathWrapper={new FilePathWrapper(text("file path", "a".repeat(200)))}
      onClicked={action(`clicked`)} />
  )).add('selected', () => (
    <FileRow
      selected={true}
      index={1}
      filePathWrapper={new FilePathWrapper(text("file path", "aaa/test/test.png"))}
      onClicked={action(`clicked`)} />
  ))
