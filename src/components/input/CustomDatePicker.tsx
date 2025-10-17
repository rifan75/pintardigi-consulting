import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { id } from 'date-fns/locale';

type DatePickerViews = 'year' | 'month' | 'day';

interface ICustomDatePicker {
    openTo?: 'day' | 'month' | 'year';
    views: DatePickerViews[];
    label?: string | any;
    name?: string | any;
    value: string | any;
    onChange: (v: any) => void;
    optional?: boolean;
    minDate?: string | any;
    maxDate?: string | any;
    inputFormat?: string | any;
}

const CustomDatePicker = ({ openTo, views, label, value, onChange, name, optional, ...params }: ICustomDatePicker) => {
    return (
        <LocalizationProvider adapterLocale={id} dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DatePicker
                    label={optional ? `${label} *Opsional` : label}
                    {...(params && { ...params })}
                    openTo={openTo ? openTo : 'day'}
                    views={views ? views : ['year', 'month', 'day']}
                    value={value}
                    onChange={onChange}
                    // renderInput={(params) => <TextField {...params} error={false} helperText={null} />}
                    slotProps={{ textField: { error: false, helperText: null } }}
                />
            </Stack>
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
