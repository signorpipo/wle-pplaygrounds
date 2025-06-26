/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 */

import { WonderlandEngine } from '@wonderlandengine/api';

/* wle:auto-imports:start */
import {Cursor} from '@wonderlandengine/components';
import {CursorTarget} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {AdjustHierarchyPhysXScaleComponent} from 'wle-pp';
import {ConsoleVRToolComponent} from 'wle-pp';
import {CursorButtonComponent} from 'wle-pp';
import {EasyTuneToolComponent} from 'wle-pp';
import {FingerCursorComponent} from 'wle-pp';
import {GamepadMeshAnimatorComponent} from 'wle-pp';
import {GrabbableComponent} from 'wle-pp';
import {GrabberHandComponent} from 'wle-pp';
import {MuteEverythingComponent} from 'wle-pp';
import {PPGatewayComponent} from 'wle-pp';
import {PlayerLocomotionComponent} from 'wle-pp';
import {ResetLocalTransformComponent} from 'wle-pp';
import {ScaleOnSpawnComponent} from 'wle-pp';
import {SetActiveComponent} from 'wle-pp';
import {SetHandLocalTransformComponent} from 'wle-pp';
import {SetHeadLocalTransformComponent} from 'wle-pp';
import {SetTrackedHandJointLocalTransformComponent} from 'wle-pp';
import {SpatialAudioListenerComponent} from 'wle-pp';
import {SwitchHandObjectComponent} from 'wle-pp';
import {ToolCursorComponent} from 'wle-pp';
import {TrackedHandDrawAllJointsComponent} from 'wle-pp';
import {VirtualGamepadComponent} from 'wle-pp';
import {WLCursorTargetWrapperComponent} from 'wle-pp';
import {FadeViewComponent} from './playground/components/fade_view_component.js';
import {FunComponent} from './playground/components/fun_component.js';
import {GrabbableSpawnerComponent} from './playground/components/grabbable_spawner_component.js';
import {LoadAudioComponent} from './playground/components/load_audio_component.js';
import {ParticlesSpawnerComponent} from './playground/components/particles_spawner_component.js';
import {PlayMusicComponent} from './playground/components/play_music_component.js';
import {PlaygroundGatewayComponent} from './playground/components/playground_gateway_component.js';
import {SetActiveOnMobileComponent} from './playground/components/set_active_on_mobile_component.js';
import {SetActiveOnMobileComponent as SetActiveOnMobileComponent1} from './playground/components/set_active_on_tracked_hands_component.js';
import {SFXOnCollisionComponent} from './playground/components/sfx_on_collision_component.js';
import {SFXOnGrabThrowComponent} from './playground/components/sfx_on_grab_throw_component.js';
import {TargetHitCheckComponent} from './playground/components/target_hit_check_component.js';
import {TeleportOnTrackedHandsComponent} from './playground/components/teleport_on_tracked_hands_component.js';
import {ToggleHowToTextComponent} from './playground/components/toggle_how_to_text_component.js';
import {WaveMovementComponent} from './playground/components/wave_movement_component.js';
/* wle:auto-imports:end */

export default function (engine: Readonly<WonderlandEngine>): void {
/* wle:auto-register:start */
engine.registerComponent(Cursor);
engine.registerComponent(CursorTarget);
engine.registerComponent(MouseLookComponent);
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
engine.registerComponent(SetTrackedHandJointLocalTransformComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(VirtualGamepadComponent);
engine.registerComponent(WLCursorTargetWrapperComponent);
engine.registerComponent(FadeViewComponent);
engine.registerComponent(FunComponent);
engine.registerComponent(GrabbableSpawnerComponent);
engine.registerComponent(LoadAudioComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(PlayMusicComponent);
engine.registerComponent(PlaygroundGatewayComponent);
engine.registerComponent(SetActiveOnMobileComponent);
engine.registerComponent(SetActiveOnMobileComponent1);
engine.registerComponent(SFXOnCollisionComponent);
engine.registerComponent(SFXOnGrabThrowComponent);
engine.registerComponent(TargetHitCheckComponent);
engine.registerComponent(TeleportOnTrackedHandsComponent);
engine.registerComponent(ToggleHowToTextComponent);
engine.registerComponent(WaveMovementComponent);
/* wle:auto-register:end */
}