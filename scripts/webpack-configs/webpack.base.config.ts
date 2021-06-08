// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

import _path from 'path';

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 17-18
const projectDir = _path.resolve(__dirname, '../..');
const resolveProject = (relativePath: string) => _path.resolve(projectDir, relativePath);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
export const paths = {
    appBuild: resolveProject('build'),
    appHtml: resolveProject('src/public/index.html'),
    appIndexTsMain: resolveProject('src/main/app.ts'),
    appIndexTsRenderer: resolveProject('src/renderer/index.tsx'),
    appPublic: resolveProject('src/public'),
    appSrcMain: resolveProject('src/main'),
    appSrcRenderer: resolveProject('src/renderer'),
    appSrcShared: resolveProject('src/shared'),
    appTsConfigMain: resolveProject('scripts/tsconfigs/tsconfig.main.json'),
    appTsConfigRenderer: resolveProject('scripts/tsconfigs/tsconfig.renderer.json'),
    appTypeDeclarations: resolveProject('src/renderer/react-app-env.d.ts'),
    proxySetup: resolveProject('src/renderer/setupProxy.js'),
    swSrc: resolveProject('src/renderer/service-worker.js'),
    testsSetup: resolveProject('src/renderer/setupTests.ts'),
};

// Alias
export const alias = {
    '#shared': resolveProject('src/shared'),
    // main
    '#MUtils': resolveProject('src/main/Utils'),
    // renderer
    '#Assets': resolveProject('src/renderer/Assets'),
    '#RUtils': resolveProject('src/renderer/Utils'),
};