import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputProps,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useController } from "react-hook-form";
import { FormInputProps } from ".";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

export const FormInputPassword = ({
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <FormControl fullWidth>
      <Typography variant="caption" sx={{ paddingTop: "0", marginTop: "0" }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <TextField
        InputProps={{
          startAdornment: startAdornment,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...(minRows && { minRows: minRows })}
        {...(multiline && { multiline: multiline })}
        type={showPassword ? "text" : type}
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
