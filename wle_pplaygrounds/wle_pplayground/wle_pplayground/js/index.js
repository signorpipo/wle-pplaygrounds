/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project's constants,
 *        such as the project's name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {ConsoleVRToolComponent} from 'wle-pp';
import {EasyTuneToolComponent} from 'wle-pp';
import {GamepadMeshAnimatorComponent} from 'wle-pp';
import {GrabbableComponent} from 'wle-pp';
import {GrabberHandComponent} from 'wle-pp';
import {MuteEverythingComponent} from 'wle-pp';
import {PPGatewayComponent} from 'wle-pp';
import {PlayerLocomotionComponent} from 'wle-pp';
import {SetHandLocalTransformComponent} from 'wle-pp';
import {SetHeadLocalTransformComponent} from 'wle-pp';
import {SpatialAudioListenerComponent} from 'wle-pp';
import {SwitchHandObjectComponent} from 'wle-pp';
import {ToolCursorComponent} from 'wle-pp';
import {TrackedHandDrawAllJointsComponent} from 'wle-pp';
import {VirtualGamepadComponent} from 'wle-pp';
import {FadeViewComponent} from './playground/components/fade_view_component.js';
import {FunComponent} from './playground/components/fun_component.js';
import {GrabbableSpawnerComponent} from './playground/components/grabbable_spawner_component.js';
import {LoadAudioComponent} from './playground/components/load_audio_component.js';
import {ParticlesSpawnerComponent} from './playground/components/particles_spawner_component.js';
import {PlayMusicComponent} from './playground/components/play_music_component.js';
import {PlaygroundGatewayComponent} from './playground/components/playground_gateway_component.js';
import {ScaleOnSpawnComponent} from './playground/components/scale_on_spawn_component.js';
import {SFXOnCollisionComponent} from './playground/components/sfx_on_collision_component.js';
import {SFXOnGrabThrowComponent} from './playground/components/sfx_on_grab_throw_component.js';
import {TargetHitCheckComponent} from './playground/components/target_hit_check_component.js';
import {WaveMovementComponent} from './playground/components/wave_movement_component.js';
/* wle:auto-imports:end */

import { loadRuntime } from '@wonderlandengine/api';

/* wle:auto-constants:start */
const RuntimeOptions = {
    physx: true,
    loader: false,
    xrFramebufferScaleFactor: 1,
    canvas: 'canvas',
};
const Constants = {
    ProjectName: 'wle-pplayground',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','local-floor','hand-tracking','hit-test',],
};
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

engine.onSceneLoaded.once(() => {
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});

/* WebXR setup. */

function requestSession(mode) {
    engine
        .requestXRSession(mode, Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures)
        .catch((e) => console.error(e));
}

function setupButtonsXR() {
    /* Setup AR / VR buttons */
    const arButton = document.getElementById('ar-button');
    if (arButton) {
        arButton.dataset.supported = engine.arSupported;
        arButton.addEventListener('click', () => requestSession('immersive-ar'));
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
        vrButton.dataset.supported = engine.vrSupported;
        vrButton.addEventListener('click', () => requestSession('immersive-vr'));
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('load', setupButtonsXR);
} else {
    setupButtonsXR();
}

/* wle:auto-register:start */
engine.registerComponent(MouseLookComponent);
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(EasyTuneToolComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(GrabbableComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(MuteEverythingComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(VirtualGamepadComponent);
engine.registerComponent(FadeViewComponent);
engine.registerComponent(FunComponent);
engine.registerComponent(GrabbableSpawnerComponent);
engine.registerComponent(LoadAudioComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(PlayMusicComponent);
engine.registerComponent(PlaygroundGatewayComponent);
engine.registerComponent(ScaleOnSpawnComponent);
engine.registerComponent(SFXOnCollisionComponent);
engine.registerComponent(SFXOnGrabThrowComponent);
engine.registerComponent(TargetHitCheckComponent);
engine.registerComponent(WaveMovementComponent);
/* wle:auto-register:end */

let loadDelaySeconds = 0;
if (loadDelaySeconds > 0) {
    setTimeout(() => engine.scene.load(`${Constants.ProjectName}.bin`), loadDelaySeconds * 1000);
} else {
    engine.scene.load(`${Constants.ProjectName}.bin`);
}

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */
