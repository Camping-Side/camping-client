import React from 'react'
import {Button} from '@mui/material'

interface PropsTypes {
  variant:  'text' | 'outlined' | 'contained'| undefined
  size:  "small" | "medium" | "large" | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function DefaultButton({variant, size, onClick}:PropsTypes) {
  return (
    <Button variant={variant} size={size} onClick={onClick}>Contained</Button>
  )
}
