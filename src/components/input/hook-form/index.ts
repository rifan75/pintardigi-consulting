import { Control } from 'react-hook-form';

export interface FormInputProps {
    name: string;
    control?: Control<any>;
    label?: string;
    placeHolder?: string;
    disabled?: boolean;
    optional?: boolean;
}
export * from './FormInput';
export * from './FormInputPassword';
export * from './SelectInput';
export * from './DatePickerInput';
export * from './SelectInputWithValue';
export * from './SearchableSelectInput';
export * from './PagingSearchSelectInput';
export * from './MultipleSelectInput';
export * from './FormattedNumberInput';

export * from './DatePickerFilter';
