'use client';
import { Direction, PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";
import { IColorPalette } from "@/interfaces/color";

interface IThemeProps {
    mode?: 'light' | 'dark';
    isOpen: [];
    fontFamily: 'Poppins' | 'sans-serif';
    borderRadius: number;
    opened: boolean;
}

export const theme = (props: IThemeProps = {
    mode: 'light',
    isOpen: [],
    fontFamily: 'Poppins',
    borderRadius: 12,
    opened: true
}) => {
    const cssVar = (name: string) =>
        getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    // Detect mode (light/dark)
    const isDark = props.mode === 'dark';

    const color: IColorPalette = {
        paper: cssVar("--paper") || "#ffffff",
        darkPaper: cssVar("--darkPaper") || "#424242",
        text1: cssVar("--text1") || "#000000",
        text2: cssVar("--text2") || "#666666",
        btnMsSuccess: cssVar("--btnMsSuccess") || "#4caf50",
        btnMsDanger: cssVar("--btnMsDanger") || "#f44336",
        btnMsInfo: cssVar("--btnMsInfo") || "#2196f3",
        btnMsRed1: cssVar("--btnMsRed1") || "#f44336",
        btnMsRed2: cssVar("--btnMsRed2") || "#d32f2f",
        btnMsWhite: cssVar("--btnMsWhite") || "#ffffff",

        primaryLight: cssVar("--primaryLight") || "#e3f2fd",
        primaryMain: cssVar("--primaryMain") || "#1976d2",
        primaryDark: cssVar("--primaryDark") || "#1565c0",
        primary200: cssVar("--primary200") || "#90caf9",
        primary800: cssVar("--primary800") || "#1565c0",

        secondaryLight: cssVar("--secondaryLight") || "#f3e5f5",
        secondaryMain: cssVar("--secondaryMain") || "#9c27b0",
        secondaryDark: cssVar("--secondaryDark") || "#7b1fa2",
        secondary200: cssVar("--secondary200") || "#ce93d8",
        secondary800: cssVar("--secondary800") || "#6a1b9a",

        errorLight: cssVar("--errorLight") || "#ffebee",
        errorMain: cssVar("--errorMain") || "#f44336",
        errorDark: cssVar("--errorDark") || "#d32f2f",
        orangeLight: cssVar("--orangeLight") || "#fff3e0",
        orangeMain: cssVar("--orangeMain") || "#ff9800",
        orangeDark: cssVar("--orangeDark") || "#f57c00",
        warningLight: cssVar("--warningLight") || "#fff8e1",
        warningMain: cssVar("--warningMain") || "#ffc107",
        warningDark: cssVar("--warningDark") || "#f57f17",
        successLight: cssVar("--successLight") || "#e8f5e8",
        successMain: cssVar("--successMain") || "#4caf50",
        success200: cssVar("--success200") || "#a5d6a7",
        successDark: cssVar("--successDark") || "#388e3c",

        grey50: cssVar("--grey50") || "#fafafa",
        grey100: cssVar("--grey100") || "#f5f5f5",
        grey200: cssVar("--grey200") || "#eeeeee",
        grey300: cssVar("--grey300") || "#e0e0e0",
        grey400: cssVar("--grey400") || "#bdbdbd",
        grey500: cssVar("--grey500") || "#9e9e9e",
        grey600: cssVar("--grey600") || "#757575",
        grey700: cssVar("--grey700") || "#616161",
        grey800: cssVar("--grey800") || "#424242",
        grey900: cssVar("--grey900") || "#212121",

        darkLevel1: cssVar("--darkLevel1") || "#2d3748",
        darkLevel2: cssVar("--darkLevel2") || "#1a202c",
        darkBackground: cssVar("--darkBackground") || "#121212",
        darkTextPrimary: cssVar("--darkTextPrimary") || "#ffffff",
        darkTextSecondary: cssVar("--darkTextSecondary") || "#aaaaaa",
    };

    const themeOption = {
        mode: (isDark ? "dark" : "light") as PaletteMode,
        colors: color,
        heading: isDark ? color.darkTextPrimary : color.grey900,
        paper: color.paper,
        backgroundDefault: isDark ? color.darkBackground : color.paper,
        background: isDark ? color.darkBackground : color.paper,
        darkTextPrimary: isDark ? color.darkTextPrimary : color.grey900,
        darkTextSecondary: isDark ? color.darkTextSecondary : color.grey700,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        darkPaper: color.darkPaper,
        text1: color.text1,
        text2: color.text2,
    };

    const themeOptions = {
        spacing: 1,
        direction: "ltr" as Direction,
        palette: {
            ...themePalette(themeOption),
        },
        mixins: {
            toolbar: {
                minHeight: "48px",
                padding: "16px",
                "@media (min-width: 600px)": {
                    minHeight: "48px",
                },
            },
        },
        typography: themeTypography(themeOption),
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
