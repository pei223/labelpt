import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '../../atoms/menu_item';
import { Divider } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { Folder, Photo } from '@material-ui/icons';
import DescriptionIcon from '@material-ui/icons/Description';

export type SideMenuProps = {
  open: boolean
  onClose: () => void
  onOpenImagesClick: () => void
  onOpenAnnotationsClick: () => void
  onLoadLabelClick: () => void
  onSaveLabelClick: () => void
}



const SideMenu = ({ open, onClose, onOpenImagesClick, onOpenAnnotationsClick, onLoadLabelClick, onSaveLabelClick }: SideMenuProps) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="left">
      <MenuItem onClick={() => onOpenImagesClick()} title="Open images" iconComponent={<Folder />} />
      <MenuItem onClick={() => onOpenAnnotationsClick()} title="Open annotation result directory" iconComponent={<Photo />} />
      <Divider />
      <MenuItem onClick={() => onLoadLabelClick()} title="Load label file" iconComponent={<ListIcon />} />
      <MenuItem onClick={() => onSaveLabelClick()} title="Save label file" iconComponent={<DescriptionIcon />} />
    </Drawer>
  )
}
export default SideMenu