import { PaletteMode } from '@mui/material';

export interface IColorPalette {
    paper: string;
    darkPaper: string;
    text1: string;
    text2: string;
    btnMsSuccess: string;
    btnMsDanger: string;
    btnMsInfo: string;
    btnMsRed1: string;
    btnMsRed2: string;
    btnMsWhite: string;
    primaryLight: string;
    primaryMain: string;
    primaryDark: string;
    primary200: string;
    primary800: string;
    secondaryLight: string;
    secondaryMain: string;
    secondaryDark: string;
    secondary200: string;
    secondary800: string;
    errorLight: string;
    errorMain: string;
    errorDark: string;
    orangeLight: string;
    orangeMain: string;
    orangeDark: string;
    warningLight: string;
    warningMain: string;
    warningDark: string;
    successLight: string;
    successMain: string;
    success200: string;
    successDark: string;
    grey50: string;
    grey100: string;
    darkTextPrimary: string;
    darkTextSecondary: string;
    darkLevel1: string;
    darkLevel2: string;
    darkBackground: string;
    grey900: string;
    grey800: string;
    grey700: string;
    grey600: string;
    grey500: string;
    grey400: string;
    grey300: string;
    grey200: string;
}

export interface ThemePalette {
    // background?: {
    //     default: string;
    // };
    mode: PaletteMode;
    colors: IColorPalette;
    darkTextPrimary: string;
    darkLevel1?: string;
    darkLevel2?: string;
    darkBackground?: string;
    darkTextSecondary: string;
    heading: string;
    textDark: string;
    paper: string;
    backgroundDefault: string;
}

export interface TypographyStyle {
    customization?: {
        fontFamily: string;
        borderRadius: string;
    };
    heading: string;
    paper: string;
    backgroundDefault: string;
    background: string;
    darkTextPrimary: string;
    darkTextSecondary: string;
    textDark: string;
    menuSelected: string;
    menuSelectedBack: string;
    divider: string;
    grey500?: string;
}