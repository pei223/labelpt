import { Container } from '@material-ui/core';
import React, { useState } from 'react'
import Header from '../header';
import SideMenu from '../sidemenu';
import "./index.css"

type Props = {
  children?: React.ReactElement
  onOpenImagesClick: () => void
  onOpenAnnotationsClick: () => void
  onLoadLabelClick: () => void
  onSaveLabelClick: () => void
}

const AppFrame = ({ children, onOpenImagesClick, onOpenAnnotationsClick, onLoadLabelClick, onSaveLabelClick }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Header onMenuButtonClick={() => setOpen(!open)} title="labelpt">
        <div>
          <SideMenu open={open} onClose={() => setOpen(false)}
            onOpenImagesClick={onOpenImagesClick}
            onOpenAnnotationsClick={onOpenAnnotationsClick}
            onLoadLabelClick={onLoadLabelClick}
            onSaveLabelClick={onSaveLabelClick}
          />
          {children ? (<div className="content-area">{children}</div>) : ""}
        </div>
      </Header>
    </div>
  )
}
export default AppFrame