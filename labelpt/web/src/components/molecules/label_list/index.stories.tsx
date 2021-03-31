import React from "react"
import { storiesOf } from '@storybook/react';
import LabelList from './index'
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import Label from "../../../domain/label";


storiesOf('molecules/LabelList', module)
  .add('default', () => (
    <LabelList
      selectedIndex={number("selected index", 2)}
      labelList={labelLs} onClick={action("label clicked")} />
  ))
  .add("empty", () => (
    <LabelList
      selectedIndex={number("selected index", -1)}
      labelList={[]} onClick={action("label clicked")} />
  ))
  .add("scroll", () => (
    <LabelList
      selectedIndex={number("selected index", 2)}
      labelList={moreLabelLs} onClick={action("label clicked")} />
  ))

const labelLs = [
  new Label(0, "test"),
  new Label(1, "aaa"),
  new Label(2, "hoge"),
  new Label(3, "aaa2"),
  new Label(4, "aaa3"),
  new Label(5, "aaa4"),
]

const moreLabelLs = [
  new Label(0, "test"),
  new Label(1, "aaa"),
  new Label(2, "hoge"),
  new Label(3, "aaa2"),
  new Label(4, "aaa3"),
  new Label(5, "aaa4"),
  new Label(6, "test"),
  new Label(7, "aaa"),
  new Label(8, "hoge"),
  new Label(9, "aaa2"),
  new Label(10, "aaa3"),
  new Label(11, "aaa4"),
  new Label(12, "test"),
  new Label(13, "aaa"),
  new Label(14, "hoge"),
  new Label(15, "aaa2"),
  new Label(16, "aaa3"),
  new Label(17, "aaa4"),
  new Label(18, "test"),
  new Label(19, "aaa"),
  new Label(20, "aaa3"),
  new Label(21, "aaa4"),
  new Label(22, "test"),
  new Label(23, "aaa"),
  new Label(24, "hoge"),
  new Label(25, "aaa2"),
  new Label(26, "aaa3"),
  new Label(27, "aaa4"),
  new Label(28, "test"),
  new Label(29, "aaa"),
]