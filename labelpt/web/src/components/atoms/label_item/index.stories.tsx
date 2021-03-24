import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from "@storybook/addon-knobs";
import LabelItem from './index'
import Label from "../../../domain/label";


storiesOf('LabelItem', module)
  .add('default', () => (
    <LabelItem
      labelInfo={new Label(1, text("label name", "testlabel"))}
      selected={boolean("selected", true)}
      onClick={action(`clicked`)}
    />
  )).add('long name', () => (
    <LabelItem
      labelInfo={new Label(2, text("label name", "testlabelfdlsaklkjf;kajdsf;jladsfjkljfdla;jfkldsjlkadsfj;l;"))}
      selected={boolean("selected", true)}
      onClick={action(`clicked`)}
    />
  )).add("selected and not selected", () => (
    <div>
      <LabelItem
        labelInfo={new Label(1, text("label name", "testlabel"))}
        selected={false}
        onClick={action(`clicked`)}
      />
      <p style={{ paddingTop: "10px" }}></p>
      <LabelItem
        labelInfo={new Label(1, text("label name", "testlabel"))}
        selected={true}
        onClick={action(`clicked`)}
      />
    </div>
  ))