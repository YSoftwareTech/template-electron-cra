import { createTypedSelector } from '#RUtils/Redux';

import { IStoreState } from '../types';

export const useMainSelector = createTypedSelector<IStoreState>();