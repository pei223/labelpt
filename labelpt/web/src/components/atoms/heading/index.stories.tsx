import React from "react"
import { storiesOf } from '@storybook/react';
import { text } from "@storybook/addon-knobs";
import Heading from './index'

storiesOf('Heading', module)
  .add('default', () => (
    <Heading>{text("Sub heading text", "text")}</Heading>
  ))