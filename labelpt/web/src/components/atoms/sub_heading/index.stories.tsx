import React from "react"
import { storiesOf } from '@storybook/react';
import { text } from "@storybook/addon-knobs";
import SubHeading from './index'

storiesOf('atoms/SubHeading', module)
    .add('default', () => (
        <SubHeading>{text("Sub heading text", "text")}</SubHeading>
    ))