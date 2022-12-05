import { TextField } from "@mui/material";
import React from "react";
import { NumberLiteralType } from "typescript";

interface Props {
  id: string;
  value: string | number;
  label?: string;
  error?: boolean;
  required?:boolean
  message?: string;
  type?: string;
  onChange?: any
}

export default function BaseTextField({
  id,
  value,
  label,
  error,
  required,
  message,
  type,
  onChange
}: Props) {
  return (
    <div>
      <TextField
        error={error}
        required={required}
        id={id}
        label={label}
        defaultValue={value}
        helperText={message}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}
