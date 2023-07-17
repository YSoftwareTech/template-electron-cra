import { assert, WindowType } from '@ter/app-common';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { appAPI } from './apis';
import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';

function Window(): JSX.Element | null {
    const type = appAPI.windowType;

    // eslint-disable-next-line default-case
    switch (type) {
        case WindowType.MAIN:
            return <MainWindow />;
    }
}

function main(): void {
    const appElement = document.getElementById('app');
    assert(appElement !== null);

    const root = createRoot(appElement);
    root.render(
        <StrictMode>
            <Window />
        </StrictMode>,
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);
}

main();
