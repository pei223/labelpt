import React from "react"
import { storiesOf } from '@storybook/react';
import AppFrame from ".";
import { action } from "@storybook/addon-actions";


storiesOf('organisms/AppFrame', module)
  .add('default', () => (
    <AppFrame
      onOpenImagesClick={action("images clicked")}
      onOpenAnnotationsClick={action("annotation clicked")}
      onLoadLabelClick={action("load label clicked")}
      onSaveLabelClick={action("save label clicked")}
    >
      <div>
        <span>aaa</span>
        <p>test</p>
      </div>
    </AppFrame>
  ))
