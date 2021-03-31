import React from "react"
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from "@storybook/addon-knobs";
import ErrorModal from "./index";



storiesOf('molecules/ErrorModal', module)
  .add('default', () => (
    <ErrorModal
      title={text("title", "title")}
      message={text("message", "fjdsfdsafdsaalfj;l")}
      onClose={() => { }}
      open={boolean("open", true)}
    />
  ))