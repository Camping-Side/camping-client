import React from 'react'
import {Button} from '@mui/material'

interface Props {
  variant:  'text' | 'outlined' | 'contained'| undefined
  size:  "small" | "medium" | "large" | undefined
  children: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function DefaultButton({variant, size,children, onClick}:Props) {
  return (
    <Button variant={variant} size={size} onClick={onClick}>{children}</Button>
  )
}

