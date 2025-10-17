import { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { id } from "date-fns/locale";
import { format as formatDate, parseISO } from "date-fns"; // Import parseISO to handle the date string

type DatePickerViews = "year" | "month" | "day";

interface IDatePickerComponentProps {
  openTo?: "day" | "month" | "year";
  views?: DatePickerViews[];
  label?: string;
  dateFormat?: string; // Date format prop
  value?: string; // Default date value as string (in MySQL format)
  required?: boolean;
  onChange: (value: string) => void; // External handler for date change
}

export const DatePickerFilter = ({
  openTo = "day",
  views = ["year", "month", "day"],
  label,
  dateFormat = "yyyy-MM-dd", // Default MySQL date format
  value, // Date string passed from parent
  required = false,
  onChange, // External handler
}: IDatePickerComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Handle the initial date when passed from the parent
  useEffect(() => {
    if (value) {
      // Parse the value string to a Date object
      setSelectedDate(parseISO(value));
    }
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Convert selected date to the required format (MySQL by default)
    const formattedDate = date ? formatDate(date, dateFormat) : "";
    onChange(formattedDate); // Trigger the external onChange handler
  };

  return (
    <>
      <Typography variant="caption">
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <LocalizationProvider adapterLocale={id} dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={views}
            openTo={openTo}
            value={selectedDate}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                helperText: "",
                variant: "outlined",
                size: "small",
                sx: {
                  width: "150px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                  },
                },
              },
            }}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
};


