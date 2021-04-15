import React from 'react'
import { MenuItem, Paper, Select, Slider, IconButton } from '@material-ui/core'
import { ZoomOut, ZoomIn, Undo, Redo } from '@material-ui/icons'

export interface ModeInfo {
  index: number
  name: string
}

export type Props = {
  modeValues: ModeInfo[]
  modeIndex: number
  brushSize: number
  alpha: number
  zoomRate: number
  width?: string
  onModeIndexChange: (index: number) => void
  onBrushSizeChange: (size: number) => void
  onAlphaChange: (alpha: number) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onUndo: () => void
  onRedo: () => void
}

const ToolBox = ({
  modeValues,
  modeIndex,
  brushSize,
  alpha,
  zoomRate,
  width = '300px',
  onModeIndexChange,
  onBrushSizeChange,
  onAlphaChange,
  onZoomIn,
  onZoomOut,
  onUndo,
  onRedo,
}: Props) => {
  const alphaSlider = () => {
    return (
      <p>
        <span>alpha</span>
        <Slider
          getAriaValueText={(_, __) => alpha.toString()}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="on"
          min={0}
          max={1}
          step={0.1}
          marks={[
            { value: 0, label: '0' },
            { value: 0.5, label: '0.5' },
            { value: 1, label: '1' },
          ]}
          onChange={(e, value) => {
            Array.isArray(value)
              ? onAlphaChange(value[0])
              : onAlphaChange(value)
          }}
          value={alpha}
          defaultValue={alpha}
        />
      </p>
    )
  }

  const brushSlider = () => {
    return (
      <p>
        <span>brush size</span>
        <Slider
          getAriaValueText={(_, __) => brushSize.toString()}
          valueLabelDisplay="on"
          min={1}
          max={100}
          step={1}
          marks={[
            { value: 1, label: '1' },
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
          onChange={(e, value) => {
            Array.isArray(value)
              ? onBrushSizeChange(value[0])
              : onBrushSizeChange(value)
          }}
          value={brushSize}
          defaultValue={brushSize}
        />
      </p>
    )
  }

  const modeSelect = () => {
    return (
      <Select
        style={{ width: '100%', textAlign: 'left' }}
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={modeIndex}
        onChange={(e) => onModeIndexChange(Number(e.target.value))}>
        {modeValues.map(({ index, name }) => (
          <MenuItem value={index}>{name}</MenuItem>
        ))}
      </Select>
    )
  }

  const zoom = () => {
    return (
      <div>
        <IconButton onClick={onZoomOut}>
          <ZoomOut />
        </IconButton>
        {Math.round(zoomRate * 100)}%
        <IconButton onClick={onZoomIn}>
          <ZoomIn />
        </IconButton>
      </div>
    )
  }

  const undoRedo = () => {
    return (
      <div>
        <IconButton onClick={() => onUndo()}>
          <Undo />
        </IconButton>
        <IconButton onClick={() => onRedo()}>
          <Redo />
        </IconButton>
      </div>
    )
  }

  return (
    <Paper style={{ padding: '15px', width: width, display: 'flex' }}>
      <div style={{ width: '75%', paddingRight: '5%' }}>
        {alphaSlider()}
        {brushSlider()}
      </div>
      <div
        style={{ display: 'inline-block', width: '20%', textAlign: 'center' }}>
        {modeSelect()}
        <div style={{ paddingTop: '20px' }}></div>
        {zoom()}
        <div style={{ paddingTop: '20px' }}></div>
        {undoRedo()}
      </div>
    </Paper>
  )
}

export default ToolBox
