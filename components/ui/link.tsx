import type { Components } from '@mui/material/styles';

import { Theme } from '../theme/types';

export const MuiLink = { defaultProps: { underline: 'hover' } } satisfies Components<Theme>['MuiLink'];
