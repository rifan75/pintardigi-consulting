import { Box } from '@mui/material';
import React from 'react';
import { RingLoader } from 'react-spinners';

type Props = {};

const ButtonLoader = (props: Props) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <RingLoader/>;
        </Box>
    );
};

export default ButtonLoader;
