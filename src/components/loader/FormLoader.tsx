import { Box, Skeleton } from '@mui/material';
import React from 'react';

type Props = {};

const FormLoader = (props: Props) => {
    return <Skeleton height={50} width={'100%'} />;
};

export default FormLoader;
