import React, { ForwardedRef } from "react";
import { NumericFormat } from "react-number-format";
import { FormControl, FormHelperText, TextField, Typography, InputProps } from "@mui/material";
import { useController } from "react-hook-form";
import { FormInputProps } from ".";

interface FormattedNumberInputProps extends FormInputProps {
  thousandSeparator?: string;
  decimalSeparator?: string;
  isNumericString?: boolean;
  required?: boolean;
  inputProps?: Partial<InputProps>;
}

const CustomTextField = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <TextField {...props} inputRef={ref} />
));

CustomTextField.displayName = "CustomTextField";

export const FormattedNumberInput = React.forwardRef<HTMLInputElement, FormattedNumberInputProps>(
  (
    {
      name,
      control,
      label,
      placeHolder,
      thousandSeparator = ",",
      decimalSeparator = ".",
      isNumericString = true,
      inputProps,
      disabled,
      required,
    }: FormattedNumberInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { field, fieldState } = useController({ name, control });
    const { error } = fieldState;

    return (
      <FormControl fullWidth>
        <Typography variant="caption" sx={{ paddingTop: "0", marginTop: "0" }}>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </Typography>
        <NumericFormat
          {...field}
          customInput={CustomTextField}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          valueIsNumericString={isNumericString}
          fullWidth
          disabled={disabled}
          error={Boolean(error)}
          onValueChange={(values) => {
            // Update the field value directly
            field.onChange(values.floatValue); // `floatValue` gives the number without formatting
          }}
          {...(placeHolder && { placeholder: placeHolder })}
          {...(inputProps && { InputProps: inputProps })}
          ref={ref} // Forward the ref to CustomTextField
        />
        {Boolean(error) && <FormHelperText sx={{ color: "red", mx: 0 }}>{error?.message}</FormHelperText>}
      </FormControl>
    );
  }
);

FormattedNumberInput.displayName = "FormattedNumberInput";







