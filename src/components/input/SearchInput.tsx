import { TextField } from '@mui/material';
import React, { ReactNode } from 'react';

type Variant = 'filled' | 'outlined' | 'standard';

interface ISearchInputProps {
    label: string;
    placeHolder: string;
    onChange: (e: any) => void;
    startAdornment: ReactNode;
    variant: Variant;
}

const SearchInput = ({ label, placeHolder, onChange, startAdornment, variant }: Partial<ISearchInputProps>) => {
    return (
        <TextField
            sx={{ display: 'flex' }}
            onChange={onChange}
            label={label}
            placeholder={placeHolder}
            variant={variant}
            InputProps={{ startAdornment: startAdornment }}
        />
    );
};

export default SearchInput;
