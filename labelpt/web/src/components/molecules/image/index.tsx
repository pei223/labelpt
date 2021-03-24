import { Paper } from "@material-ui/core"
import React from "react"
import SubHeading from "../../atoms/sub_heading"

export interface ImageInfo {
  fileName: string,
  imageSrc?: any,
  width: number,
  height: number,
}

export type ImageProps = {
  imageInfo: ImageInfo
  zoomRate: number
  viewHeight?: string
}

const Image = ({ imageInfo, zoomRate, viewHeight = "500px" }: ImageProps) => {
  return (
    <Paper style={{ "padding": "15px" }}>
      <SubHeading>{imageInfo.fileName}</SubHeading>
      <div style={{ overflow: "scroll", height: viewHeight }}>
        <img src={imageInfo.imageSrc} width={`${imageInfo.width * zoomRate / 100}px`} height={`${imageInfo.height * zoomRate / 100}px`} />
      </div>
    </Paper>
  )
}
export default Image