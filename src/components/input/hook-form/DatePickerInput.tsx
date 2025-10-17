import { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { id } from "date-fns/locale";
import { format, parse } from "date-fns";
import { Control, useController } from "react-hook-form";

type DatePickerViews = "year" | "month" | "day";

interface IDatePickerInputProps {
  openTo?: "day" | "month" | "year";
  views?: DatePickerViews[];
  label?: string;
  name: string;
  control: Control<any>;
  optional?: boolean;
  // minDate?: string;
  // maxDate?: string;
  format?: string;
  required?: boolean;
  onChange?: (value: string) => void; // Add this line
}

export const DatePickerInput = ({
  openTo,
  views,
  label,
  name,
  control,
  optional,
  required,
  ...params
}: IDatePickerInputProps) => {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name, control });
  const { error } = fieldState;

  // Convert value to Date object
  const selectedDate = value ? new Date(value) : null;

  const handleDateChange = (date: Date | null | number) => {
    // Convert selectedDate to MySQL date format before updating
    const mysqlFormattedDate =
      date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date as number)
        ? format(date, "yyyy-MM-dd")
        : "";
    onChange(mysqlFormattedDate);
  };

  return (
    <>
      <Typography variant="caption" sx={{ paddingTop: "0", marginTop: "0" }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <LocalizationProvider adapterLocale={id} dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            // label={optional ? `${label} *Opsional` : label}
            {...(params && { ...params })}
            // views={views ? views : ["year", "month", "day"]}
            value={selectedDate}
            onChange={handleDateChange}
            slotProps={{ textField: { error: Boolean(error), helperText: error?.message } }}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
};
