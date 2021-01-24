import {
    Action,
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

// IReducer

export type IReducer<State, Payload = undefined> = (
    state: WritableDraft<State>,
    action: PayloadAction<Payload>,
) => void;

// IMapActionsToProps

interface IActions {
    readonly [key: string]: ActionCreator;
}

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<Action> = Action extends (payload: infer Payload) => PayloadAction<any>
    ? Payload
    : unknown;

type DispatchAction<Action extends ActionCreator> = Action extends ActionCreatorWithoutPayload
    ? () => ReturnType<Action>
    : (payload: PayloadInAction<Action>) => ReturnType<Action>;

export type IMapActionsToProps<Actions extends IActions> = {
    readonly [ReducerName in keyof Actions]?: DispatchAction<Actions[ReducerName]>;
};

// IMapThunksToProps

interface IThunks {
    readonly [key: string]: (
        ...args: any
    ) => ThunkAction<Promise<void> | void, any, any, Action<any>>;
}

export type IMapThunksToProps<Thunks extends IThunks> = {
    readonly [ThunkName in keyof Thunks]?: (...args: Parameters<Thunks[ThunkName]>) => void;
};