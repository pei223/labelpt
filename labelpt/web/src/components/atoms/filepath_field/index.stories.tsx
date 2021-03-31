import React, { useState } from "react"
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FilePathField from "./index";


const Wrapper = () => {
  const [filePath, setFilePath] = useState("")
  return (
    <FilePathField
      label="filepath"
      filePath={filePath}
      onButtonClick={action(`clicked`)}
      onChange={(filePath_) => setFilePath(filePath_)}
    />
  )
}

storiesOf('atoms/FilePathField', module)
  .add('default', () => (
    <Wrapper />
  ))
