import React from "react"
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from "@storybook/addon-knobs";
import InfoModal from "./index";



storiesOf('molecules/InfoModal', module)
  .add('default', () => (
    <InfoModal
      title={text("title", "title")}
      message={text("message", "fjdsfdsafdsaalfj;l")}
      onClose={() => { }}
      open={boolean("open", true)}
    />
  ))