import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ISelectItem {
  id: string | number;
  text: string;
  value: string | number | undefined;
}

interface Props {
  selectList: ISelectItem[];
  label: string;
  selected: string | undefined;
  error?: boolean;
  disabled?: boolean;
  message?: string;
  handleChange: (event: SelectChangeEvent) => void;
  name?: string;
  required?: boolean;
}

export default function BaseSelect({
  selectList,
  label,
  selected,
  message,
  handleChange,
  name,
  required,
}: Props) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selected}
          label={label}
          onChange={handleChange}
          name={name}
          required={required}
        >
          {selectList.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{message}</FormHelperText>
      </FormControl>
    </div>
  );
}
