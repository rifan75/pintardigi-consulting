import Chip from '@mui/material/Chip';

export const rupiah = (number: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
        // currencyDisplay: 'symbol'
    });
    const formattedNumber = formatter.format(number);
    const symbolWithSpace = 'IDR '; // Add the currency symbol and space here
    return formattedNumber.replace('IDR', symbolWithSpace);
};

// function to format date
export const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
};

export const formatCompleteDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    return new Date(date).toLocaleDateString('id-ID', options);
};


export const formatShortDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
};

//function for styling status project
export const statusProject = (status: string) => {
    switch (status) {
        case 'draft':
            return <Chip label={status} color="primary" />;
        case 'menunggu':
            return <Chip label={status} color="success" />;
        case 'in':
            return <Chip label={status} color="warning" />;
        case 'out':
            return <Chip label={status} color="error" />;
        case 'selesai':
            return <Chip label={status} color="info" />;
        default:
            return <Chip label={status} color="secondary" />;
    }
};

export const sanitizeNumericData = (value: string | number): string => {
    if (typeof value === 'string') {
        return value.replace(/,/g, '');
    }
    return value.toString();
};
