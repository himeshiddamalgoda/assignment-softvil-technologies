import type { ColorSystemOptions } from '@mui/material/styles';

import { california, kepple, neonBlue, nevada, redOrange, shakespeare, stormGrey } from './colors';
import { ColorScheme } from './types';

declare module '@mui/material/styles' {
    interface PaletteRange {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    }
  
    interface Palette {
      neutral: PaletteRange;
    }
  
    interface PaletteOptions {
      neutral?: PaletteRange;
    }
  
    interface TypeBackground {
      level1: string;
      level2: string;
      level3: string;
    }
  }
  
  export const colorSchemes = {
      dark: {
        palette: {
          action: { disabledBackground: 'rgba(0, 0, 0, 0.12)' },
          background: {
            default: nevada[950],              // '#090a0b'
            defaultChannel: '9 10 11',
            paper: nevada[900],                // '#121517'
            paperChannel: '19 78 72',
            level1: nevada[800],               // '#202427'
            level2: nevada[700],               // '#32383e'
            level3: nevada[600],               // '#555e68'
          },
          common: { black: '#000000', white: '#ffffff' },
          divider: nevada[700],               // '#32383e'
          dividerChannel: '50 56 62',
          error: {
            ...redOrange,
            light: redOrange[300],
            main: redOrange[400],
            dark: redOrange[500],
            contrastText: '#000000',
          },
          info: {
            ...shakespeare,
            light: shakespeare[300],
            main: shakespeare[400],
            dark: shakespeare[500],
            contrastText: '#000000',
          },
          neutral: { ...nevada },
          primary: {
            ...neonBlue,
            light: neonBlue[300],
            main: neonBlue[400],
            dark: neonBlue[500],
            contrastText: '#000000',
          },
          secondary: {
            ...nevada,
            light: nevada[100],
            main: nevada[200],
            dark: nevada[300],
            contrastText: '#000000',
          },
          success: {
            ...kepple,
            light: kepple[300],
            main: kepple[400],
            dark: kepple[500],
            contrastText: '#000000',
          },
          text: {
            primary: nevada[100],             // '#f0f4f8'
            primaryChannel: '240 244 248',
            secondary: nevada[400],           // '#9fa6ad'
            secondaryChannel: '159 166 173',
            disabled: nevada[600],            // '#555e68'
          },
          warning: {
            ...california,
            light: california[300],
            main: california[400],
            dark: california[500],
            contrastText: '#000000',
          },
        },
      },
      light: {
        palette: {
          action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
          background: {
            default: '#ffffff',
            defaultChannel: '255 255 255',
            paper: '#ffffff',
            paperChannel: '255 255 255',
            level1: stormGrey[50],           // '#f9fafb'
            level2: stormGrey[100],          // '#f1f1f4'
            level3: stormGrey[200],          // '#dcdfe4'
          },
          common: { black: '#000000', white: '#ffffff' },
          divider: stormGrey[200],          // '#dcdfe4'
          dividerChannel: '220 223 228',
          error: {
            ...redOrange,
            light: redOrange[400],
            main: redOrange[500],
            dark: redOrange[600],
            contrastText: '#ffffff',
          },
          info: {
            ...shakespeare,
            light: shakespeare[400],
            main: shakespeare[500],
            dark: shakespeare[600],
            contrastText: '#ffffff',
          },
          neutral: { ...stormGrey },
          primary: {
            ...neonBlue,
            light: neonBlue[400],
            main: neonBlue[500],
            dark: neonBlue[600],
            contrastText: '#ffffff',
          },
          secondary: {
            ...nevada,
            light: nevada[600],
            main: nevada[700],
            dark: nevada[800],
            contrastText: '#ffffff',
          },
          success: {
            ...kepple,
            light: kepple[400],
            main: kepple[500],
            dark: kepple[600],
            contrastText: '#ffffff',
          },
          text: {
            primary: stormGrey[900],         // '#212636'
            primaryChannel: '33 38 54',
            secondary: stormGrey[500],       // '#667085'
            secondaryChannel: '102 112 133',
            disabled: stormGrey[400],        // '#8a94a6'
          },
          warning: {
            ...california,
            light: california[400],
            main: california[500],
            dark: california[600],
            contrastText: '#ffffff',
          },
        },
      },
    } satisfies Partial<Record<ColorScheme, ColorSystemOptions>>;
    