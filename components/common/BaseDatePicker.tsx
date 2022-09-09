import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import bgLocale from 'date-fns/locale/bg';
import { ko } from 'date-fns/locale';

interface Props {
    label: string
    value: Date | null
    handleChange:(value: any, keyboardInputValue?: string | undefined) => void

}

export default function BaseDatePicker({label="달력", value, handleChange}: Props) {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <DesktopDatePicker
        label={label}
        inputFormat="yyyy/MM/dd"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
