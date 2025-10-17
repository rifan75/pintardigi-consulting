import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectOption } from "@/interfaces/input";
import React from "react";
import { useController } from "react-hook-form";
import { FormInputProps } from ".";

interface SelectInputProps extends FormInputProps {
  options: SelectOption[] | undefined;
  value: string | undefined;
}

export const SelectInputWithValue = ({ options, control, name, placeHolder, label, value }: SelectInputProps) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select label={label} {...(placeHolder && { placeholder: placeHolder })} {...field} value={value}>
        {options?.map((value: any, i) => {
          return (
            <MenuItem key={i} value={value.value}>
              {value.label}
            </MenuItem>
          );
        })}
      </Select>
      {Boolean(error) && <FormHelperText sx={{ color: "red", mx: 0 }}>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
