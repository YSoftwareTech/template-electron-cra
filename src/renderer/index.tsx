import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { WindowType } from '@Utils';
import { baseIpcRenderer } from '@Electron';

import * as serviceWorker from './serviceWorker';
import { ReactAppClientArea } from './ReactApp';

function CreateClientArea(): JSX.Element {
    const windowType: WindowType = baseIpcRenderer.getWindowType();

    let clientArea: JSX.Element;
    switch (windowType) {
        case WindowType.mainWindow:
            clientArea = <ReactAppClientArea />;
            break;

        default:
            clientArea = <ReactAppClientArea />;
    }

    return clientArea;
}

ReactDOM.render(
    <React.StrictMode>
        <CreateClientArea />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change unregister() to register()
// below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
