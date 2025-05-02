import type { Components } from '@mui/material/styles';

import { Theme } from '../theme/types';

export const MuiStack = { defaultProps: { useFlexGap: true } } satisfies Components<Theme>['MuiStack'];
