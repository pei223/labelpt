import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import SideMenu from ".";
import { boolean } from "@storybook/addon-knobs";

storiesOf('organisms/Sidebar', module)
  .add('default', () => (
    <SideMenu
      open={boolean("toggle", true)}
      onClose={action("on close clicked")}
      onLoadLabelClick={action("load label clicked")}
      onOpenImagesClick={action("open images clicked")}
      onOpenAnnotationsClick={action("open annotation clicked")}
      onSaveLabelClick={action("save label clicked")} />
  ))