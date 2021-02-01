import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

export type IReducer<State, Payload = undefined> = (
    state: WritableDraft<State>,
    action: PayloadAction<Payload>,
) => void;