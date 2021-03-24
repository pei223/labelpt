import React from "react"
import { storiesOf } from '@storybook/react';
import Header from './index'
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";


storiesOf('Header', module)
  .add('default', () => (
    <Header onMenuButtonClick={action("menu clicked")} title="test title" >
      <div>{text("inner node", "test")}</div>
    </Header>
  ))