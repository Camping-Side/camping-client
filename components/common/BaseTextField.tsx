import { TextField } from "@mui/material";
import React from "react";
import { NumberLiteralType } from "typescript";

interface Props {
  id?: string;
  value?: string | number;
  label?: string;
  error?: boolean;
  required?: boolean;
  message?: string;
  type?: string;
  onChange?: any;
  name?: string;
}

export default function BaseTextField({
  id,
  value,
  label,
  error,
  required,
  message,
  type,
  onChange,
  name,
}: Props) {
  return (
    <div>
      <TextField
        id={id}
        name={name}
        error={error}
        required={required}
        label={label}
        defaultValue={value}
        helperText={message}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}
