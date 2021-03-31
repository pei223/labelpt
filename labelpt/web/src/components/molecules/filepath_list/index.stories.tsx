import React from "react"
import { storiesOf } from '@storybook/react';
import FilePathList from './index'
import { action } from "@storybook/addon-actions";
import FilePathWrapper from "../../../domain/filepath_wrapper";
import { number } from "@storybook/addon-knobs";


const filepathLs = [
  new FilePathWrapper("test/aaa/hoge.png"),
  new FilePathWrapper("test/aaa/hoge.png"),
  new FilePathWrapper("test/aaa/hoge.png"),
  new FilePathWrapper("test/aaa/hoge.png"),
]

storiesOf('FilePathList', module)
  .add('default', () => (
    <FilePathList selectedIndex={number("selected index", 1)} filePathList={filepathLs} onClick={action("filepath clicked,")} listHeight="300px" />
  ))
  .add("empty", () => (
    <FilePathList selectedIndex={number("selected index", 1)} filePathList={[]} onClick={action("filepath clicked,")} listHeight="300px" />
  ))
  .add("scroll", () => (
    <FilePathList selectedIndex={number("selected index", 1)} filePathList={filepathLs.concat(filepathLs).concat(filepathLs).concat(filepathLs)} onClick={action("filepath clicked,")} listHeight="300px" />
  ))