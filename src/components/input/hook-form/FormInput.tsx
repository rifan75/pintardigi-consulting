import { FormControl, FormHelperText, InputProps, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useController } from "react-hook-form";
import { FormInputProps } from ".";

interface FormSelectProps extends FormInputProps {
  type?: string;
  isShrink?: boolean;
  inputProps?: Partial<InputProps>;
  multiline?: boolean;
  minRows?: number;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  required?: boolean;
}

export const FormInput = ({
  name,
  control,
  placeHolder,
  label,
  isShrink = false,
  type = "text",
  inputProps,
  multiline,
  minRows,
  endAdornment,
  startAdornment,
  disabled,
  required,
}: FormSelectProps) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  return (
    <FormControl fullWidth>
      <Typography variant="caption" sx={{ paddingTop: "0", marginTop: "0", fontSize: "0.8rem" }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <TextField
        InputProps={{ startAdornment: startAdornment, endAdornment: endAdornment }}
        {...(minRows && { minRows: minRows })}
        {...(multiline && { multiline: multiline })}
        type={type}
        // label={optional ? `${label} *Opsional` : label}
        disabled={disabled}
        {...(placeHolder && { placeholder: placeHolder })}
        error={Boolean(error)}
        {...(isShrink && { InputLabelProps: { shrink: true } })}
        {...field}
        {...(inputProps && { InputProps: inputProps })}
      />
      {Boolean(error) && <FormHelperText sx={{ color: "red", mx: 0 }}>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
