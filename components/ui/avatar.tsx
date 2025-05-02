import type { Components } from '@mui/material/styles';

import { Theme } from '../theme/types';

export const MuiAvatar = {
  styleOverrides: { root: { fontSize: '14px', fontWeight: 600, letterSpacing: 0 } },
} satisfies Components<Theme>['MuiAvatar'];
