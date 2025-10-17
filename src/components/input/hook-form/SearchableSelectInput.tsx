import { FormControl, FormHelperText } from '@mui/material';
import { SelectOption } from '@/interfaces/input';
import { useController } from 'react-hook-form';
import ReactSelect, { GroupBase, StylesConfig } from 'react-select';
import { FormInputProps } from '.';

interface SearchableSelectInputProps extends FormInputProps {
    options: SelectOption[] | any;
    isFetching?: boolean;
    onInputChange?: (v: any) => void;
    styles?: StylesConfig<any, false, GroupBase<any>> | undefined;
}

export const SearchableSelectInput = ({ options, control, name, placeHolder, isFetching, onInputChange, styles }: SearchableSelectInputProps) => {
    const { field, fieldState } = useController({ name, control });
    const { error } = fieldState;
    return (
        <FormControl fullWidth error={Boolean(error)}>
            <ReactSelect
                styles={styles}
                isSearchable={true}
                isLoading={isFetching}
                loadingMessage={() => {
                    return 'Sedang Mencari...';
                }}
                noOptionsMessage={() => {
                    return 'Data Tidak Ditemukan';
                }}
                isClearable={true}
                backspaceRemovesValue={true}
                onInputChange={onInputChange}
                placeholder={placeHolder}
                value={field.value}
                onChange={field.onChange}
                options={options}
            />
            {Boolean(error) && <FormHelperText sx={{ color: 'red', mx: 0 }}>{error?.message}</FormHelperText>}
        </FormControl>
    );
};

// export default SearchableSelectInput;
