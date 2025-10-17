import { FormControl, FormHelperText, Typography, MenuItem, Select } from "@mui/material";
import { SelectOption } from "@/interfaces/input";
import React from "react";
import { useController } from "react-hook-form";
import { FormInputProps } from ".";

interface SelectInputProps extends FormInputProps {
  options: SelectOption[] | undefined;
  required?: boolean;
}

export const SelectInput = ({ options, control, name, placeHolder, label, required }: SelectInputProps) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <Typography variant="caption" sx={{ paddingTop: "0", marginTop: "0" }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <Select {...field} displayEmpty>
        {placeHolder && (
          <MenuItem value="" disabled>
            {placeHolder}
          </MenuItem>
        )}
        {options?.map((value: any, i) => (
          <MenuItem key={i} value={value.value}>
            {value.label}
          </MenuItem>
        ))}
      </Select>
      {Boolean(error) && <FormHelperText sx={{ color: "red", mx: 0 }}>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
