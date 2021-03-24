import { ListItemIcon, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

type Props = {
  iconComponent: React.ReactElement
  title: string
  onClick: () => void
}

const MenuItem = ({iconComponent, title, onClick}: Props) => {
    return (
      <ListItem button key={title} onClick={() => onClick()}>
        <ListItemIcon>{iconComponent}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    )
}
export default MenuItem