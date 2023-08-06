import type { WindowType } from '@ter/app-common/apis/app';

export interface CreateWindowOption {
    windowType: WindowType;
}

export interface CloseWindowOption {
    windowId: string;
}

export interface WindowOption {
    windowId: string;
    onClose: (option: CloseWindowOption) => void | Promise<void>;
}

export interface AbstractWindowOption extends WindowOption {
    windowType: WindowType;
}
