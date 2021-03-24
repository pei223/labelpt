import React from 'react'
import { IconButton, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

export type HeaderProps = {
  children: React.ReactElement
  onMenuButtonClick: () => void
  title: string
}


const Header = ({ children, onMenuButtonClick, title }: HeaderProps) => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar style={{ width: "100%", textAlign: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuButtonClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="h1" style={{ width: "100%" }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </div>
  )
}

export default Header