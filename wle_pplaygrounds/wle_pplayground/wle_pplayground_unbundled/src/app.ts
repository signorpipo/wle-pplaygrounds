/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project's constants,
 *        such as the project's name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

import { loadRuntime, LoadRuntimeOptions, LogLevel } from '@wonderlandengine/api';

const waitWindowLoad: Promise<void> = new Promise((resolve: () => void) => {
    if (document.readyState == "complete") {
        resolve();
    } else {
        window.addEventListener("load", resolve, { once: true });
    }
});

await waitWindowLoad;

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'wle-pplayground-unbundled',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','local-floor','hand-tracking','hit-test',],
};
const RuntimeOptions = {
    physx: true,
    loader: false,
    xrFramebufferScaleFactor: 1,
    xrOfferSession: {
        mode: 'auto',
        features: Constants.WebXRRequiredFeatures,
        optionalFeatures: Constants.WebXROptionalFeatures,
    },
    canvas: 'canvas',
} as const;
/* wle:auto-constants:end */

const disableEngineLogs = false;
if (disableEngineLogs) {
    (RuntimeOptions as LoadRuntimeOptions).logs = [LogLevel.Error];
}

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);
engine.onLoadingScreenEnd.once(() => {
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});

/* WebXR setup. */

function requestSession(mode: XRSessionMode): void {
    engine
        .requestXRSession(mode, Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures)
        .catch((e) => console.error(e));
}

function setupButtonsXR(): void {
    /* Setup AR / VR buttons */
    const arButton = document.getElementById('ar-button');
    if (arButton) {
        arButton.dataset.supported = engine.arSupported as unknown as string;
        arButton.addEventListener('click', () => requestSession('immersive-ar'));
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
        vrButton.dataset.supported = engine.vrSupported as unknown as string;
        vrButton.addEventListener('click', () => requestSession('immersive-vr'));
    }
}

setupButtonsXR();

const sceneLoadDelaySeconds = 0;
if (sceneLoadDelaySeconds > 0) {
    await new Promise((resolve) => setTimeout(resolve, sceneLoadDelaySeconds * 1000));
}

try {
    await engine.loadMainScene(`${Constants.ProjectName}.bin`);
} catch (error) {
    console.error(error);
    window.alert(`Failed to load ${Constants.ProjectName}.bin: ` + error);
}

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */