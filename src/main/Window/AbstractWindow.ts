import Path from 'path';
import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron';

import { WindowType, WindowChannels } from '@Utils/Window';

import { CreateWindow } from '.';

type WindowEvent = () => void;
type IpcEvent<Args = undefined> = Args extends undefined
    ? (event: IpcMainEvent) => void
    : (event: IpcMainEvent, args: Args) => void;

export interface CreateWindowOption {
    development: boolean;
    height?: number;
    width?: number;
}

export abstract class AbstractWindow {
    protected _window?: BrowserWindow;
    protected readonly _windowType: WindowType;

    public constructor(windowType: WindowType) {
        this._window = undefined;
        this._windowType = windowType;
    }

    public async Create(options: CreateWindowOption): Promise<void> {
        if (this._window !== undefined) return;

        const { development, height, width } = options;

        this._window = new BrowserWindow({
            width: width === undefined ? 1280 : width,
            height: height === undefined ? 720 : height,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true,
            },
        });

        this._AddWindowListeners();
        this._AddIpcListeners();

        if (!development) {
            await this._window.loadFile(Path.join(__dirname, 'index.html'));
        } else {
            await this._window.loadURL('http://localhost:3000/');
        }

        this._window.show();
    }

    // -------------------------------------------------------------------------------------- Getter

    public get State(): boolean {
        return this._window !== undefined;
    }

    // ---------------------------------------------------------------------------- Window Listeners

    protected _AddWindowListeners(): void {
        this._window!.on('show', this._Wrapper_WindowShowed);
        this._window!.on('resize', this._Wrapper_WindowResized);
        this._window!.once('closed', this._OnWindowClosed);
    }

    protected _RemoveWindowListeners(): void {
        this._window!.removeListener('show', this._Wrapper_WindowShowed);
        this._window!.removeListener('resize', this._Wrapper_WindowResized);
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected _AddIpcListeners(): void {
        ipcMain.on(
            WindowChannels.MainWindow.ClientAreaInitialized,
            this._Wrapper_ClientAreaInitialized
        );
        ipcMain.on(WindowChannels.MainWindow.WindowToOpen, this._Wrapper_NewWindowToOpen);
        ipcMain.on(WindowChannels.Common.WindowType, this._Wrapper_WindowTypeToGet);
    }

    protected _RemoveIpcListeners(): void {
        ipcMain.removeListener(
            WindowChannels.MainWindow.ClientAreaInitialized,
            this._Wrapper_ClientAreaInitialized
        );
        ipcMain.removeListener(
            WindowChannels.MainWindow.WindowToOpen,
            this._Wrapper_NewWindowToOpen
        );
        ipcMain.removeListener(WindowChannels.Common.WindowType, this._Wrapper_WindowTypeToGet);
    }

    // ------------------------------------------------------------------------------- Window Events

    private _OnWindowClosed: WindowEvent = () => {
        this._RemoveWindowListeners();
        this._RemoveIpcListeners();
        this._window = undefined;
    };

    private _Wrapper_WindowShowed: WindowEvent = () => this._OnWindowShowed();
    protected _OnWindowShowed(): void {}

    private _Wrapper_WindowResized: WindowEvent = () => this._OnWindowResized();
    protected _OnWindowResized(): void {
        let size = this._window!.getContentSize();

        this._window!.webContents.send(WindowChannels.MainWindow.WindowResized, {
            width: size[0],
            height: size[1],
        });
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    private _InvokeEventHandler(event: IpcMainEvent, eventHandler: () => void) {
        if (event.sender.id === this._window!.id) {
            eventHandler();
        }
    }

    private _Wrapper_WindowTypeToGet: IpcEvent = event =>
        this._InvokeEventHandler(event, () => this._OnWindowTypeToGet(event));

    private _OnWindowTypeToGet = (event: IpcMainEvent): void => {
        event.returnValue = this._windowType;
    };

    private _Wrapper_ClientAreaInitialized: IpcEvent = event =>
        this._InvokeEventHandler(event, () => this._OnClientAreaInitialized(event));

    protected _OnClientAreaInitialized(event: IpcMainEvent): void {
        let size = this._window!.getContentSize();
        event.reply(WindowChannels.MainWindow.ClientAreaInitialized, {
            width: size[0],
            height: size[1],
        });
    }

    private _Wrapper_NewWindowToOpen: IpcEvent<number> = (event, windowType) =>
        this._InvokeEventHandler(event, () => this._OnNewWindowToOpen(event, windowType));

    protected _OnNewWindowToOpen(event: any, windowType: WindowType): void {
        CreateWindow(windowType);
    }
}