import React from "react"
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddForm from "./index";


storiesOf('atoms/AddForm', module)
  .add('default', () => (
    <AddForm
      onSubmit={action(`clicked`)} />
  ))
