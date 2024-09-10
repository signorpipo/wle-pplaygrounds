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
import {Cursor} from '@wonderlandengine/components';
import {CursorTarget} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {FadeViewComponent} from './playground/components/fade_view_component.js';
import {FunComponent} from './playground/components/fun_component.js';
import {GrabbableSpawnerComponent} from './playground/components/grabbable_spawner_component.js';
import {LoadAudioComponent} from './playground/components/load_audio_component.js';
import {ParticlesSpawnerComponent} from './playground/components/particles_spawner_component.js';
import {PlayMusicComponent} from './playground/components/play_music_component.js';
import {PlaygroundGatewayComponent} from './playground/components/playground_gateway_component.js';
import {SetActiveOnMobileComponent} from './playground/components/set_active_on_mobile_component.js';
import {SFXOnCollisionComponent} from './playground/components/sfx_on_collision_component.js';
import {SFXOnGrabThrowComponent} from './playground/components/sfx_on_grab_throw_component.js';
import {TargetHitCheckComponent} from './playground/components/target_hit_check_component.js';
import {ToggleHowToTextComponent} from './playground/components/toggle_how_to_text_component.js';
import {WaveMovementComponent} from './playground/components/wave_movement_component.js';
import {AdjustHierarchyPhysXScaleComponent} from './pp/index.js';
import {ConsoleVRToolComponent} from './pp/index.js';
import {CursorButtonComponent} from './pp/index.js';
import {EasyTuneToolComponent} from './pp/index.js';
import {FingerCursorComponent} from './pp/index.js';
import {GamepadMeshAnimatorComponent} from './pp/index.js';
import {GrabbableComponent} from './pp/index.js';
import {GrabberHandComponent} from './pp/index.js';
import {MuteEverythingComponent} from './pp/index.js';
import {PPGatewayComponent} from './pp/index.js';
import {PlayerLocomotionComponent} from './pp/index.js';
import {ResetLocalTransformComponent} from './pp/index.js';
import {ScaleOnSpawnComponent} from './pp/index.js';
import {SetActiveComponent} from './pp/index.js';
import {SetHandLocalTransformComponent} from './pp/index.js';
import {SetHeadLocalTransformComponent} from './pp/index.js';
import {ShowXRButtonsComponent} from './pp/index.js';
import {SpatialAudioListenerComponent} from './pp/index.js';
import {SwitchHandObjectComponent} from './pp/index.js';
import {ToolCursorComponent} from './pp/index.js';
import {TrackedHandDrawAllJointsComponent} from './pp/index.js';
import {VirtualGamepadComponent} from './pp/index.js';
/* wle:auto-imports:end */

import { loadRuntime, LogLevel } from '@wonderlandengine/api';

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'wle-pplayground-pipo',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','local-floor','hand-tracking','hit-test',],
};
const RuntimeOptions = {
    physx: true,
    loader: false,
    xrFramebufferScaleFactor: 1,
    canvas: 'canvas',
};
/* wle:auto-constants:end */

const disableEngineLogs = true;
if (disableEngineLogs) {
    RuntimeOptions.logs = [LogLevel.Error];
}

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);
engine.onLoadingScreenEnd.once(() => {
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
engine.registerComponent(Cursor);
engine.registerComponent(CursorTarget);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(FadeViewComponent);
engine.registerComponent(FunComponent);
engine.registerComponent(GrabbableSpawnerComponent);
engine.registerComponent(LoadAudioComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(PlayMusicComponent);
engine.registerComponent(PlaygroundGatewayComponent);
engine.registerComponent(SetActiveOnMobileComponent);
engine.registerComponent(SFXOnCollisionComponent);
engine.registerComponent(SFXOnGrabThrowComponent);
engine.registerComponent(TargetHitCheckComponent);
engine.registerComponent(ToggleHowToTextComponent);
engine.registerComponent(WaveMovementComponent);
engine.registerComponent(AdjustHierarchyPhysXScaleComponent);
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(CursorButtonComponent);
engine.registerComponent(EasyTuneToolComponent);
engine.registerComponent(FingerCursorComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(GrabbableComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(MuteEverythingComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(ResetLocalTransformComponent);
engine.registerComponent(ScaleOnSpawnComponent);
engine.registerComponent(SetActiveComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(ShowXRButtonsComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(VirtualGamepadComponent);
/* wle:auto-register:end */

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