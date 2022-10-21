import { AbstractWindow } from './abstractWindow';
import type { WindowOption } from './types';

export class MainWindow extends AbstractWindow {
    constructor(option: Omit<WindowOption, 'windowType'>) {
        super({ windowType: 'main', ...option });
    }
}
