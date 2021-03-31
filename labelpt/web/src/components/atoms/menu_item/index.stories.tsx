import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from "@storybook/addon-knobs";
import MenuItem from './index'
import MailIcon from '@material-ui/icons/Mail';
import { ArrowBack } from "@material-ui/icons";

storiesOf('atoms/MenuItem', module)
  .add('default', () => (
    <MenuItem iconComponent={<MailIcon />} 
      title={text("title", "test menu")}
      onClick={action("on menu clicked.")}></MenuItem>
  )).add("other icon", () => (
    <MenuItem iconComponent={<ArrowBack />} 
    title={text("title", "test menu")}
    onClick={action("on menu clicked.")}></MenuItem>
  ))
