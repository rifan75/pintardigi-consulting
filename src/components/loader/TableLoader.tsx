import { Box } from '@mui/material';
import React from 'react';
import { RingLoader } from 'react-spinners';

type Props = {};

const TableLoader = (props: Props) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <RingLoader
                size="100"
                color="#e15b64"
            />
        </Box>
    );
};

export default TableLoader;
