import { FormControl, FormHelperText, Typography, MenuItem, Checkbox } from "@mui/material";
import Select from "@mui/material/Select";
import React from "react";
import { useController } from "react-hook-form";
import { FormInputProps } from ".";

type SelectOption = {
  label: string | null;
  value: string;
};

interface SelectInputProps extends FormInputProps {
  options: SelectOption[] | undefined;
  required?: boolean;
}

export const MultipleSelectInput = ({ options, control, name, placeHolder, label, required }: SelectInputProps) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const selectedLabels = (selected: string[]) => {
    if (!options) return [];
    return options
      .filter(option => selected.includes(option.value))
      .map(option => option.label)
      .filter(label => label !== null); // Ensure labels are not null
  };

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <Typography variant="caption" sx={{ paddingTop: "0", marginTop: "0" }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <Select
        multiple
        displayEmpty
        {...field}
        renderValue={(selected) => 
          selected.length > 0 ? selectedLabels(selected as string[]).join(", ") : placeHolder
        }
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={field.value.indexOf(option.value) > -1} />
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText sx={{ color: "red", mx: 0 }}>{error.message}</FormHelperText>}
    </FormControl>
  );
};


