import { Button } from '@material-ui/core';
import Label from '../../../domain/label';

type Props = {
  labelInfo: Label
  selected: boolean
  width?: string
  onClick: (labelInfo: Label) => void
}

const LabelItem = ({ labelInfo, selected, width = "100%", onClick }: Props) => {
  const backgroundColor = selected ? labelInfo.getBrightRGBString() : "white"
  const textColor = selected ? "white" : labelInfo.getBrightRGBString()
  return (
    <Button
      size="small"
      variant={selected ? "contained" : "outlined"}
      onClick={() => onClick(labelInfo)}
      style={{
        textTransform: "none",
        width: width,
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: textColor,
        borderWidth: "2px",
      }}>{labelInfo.index}: {labelInfo.name}</Button>
  )
}
export default LabelItem