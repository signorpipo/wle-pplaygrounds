import { FadeViewComponent } from "./components/fade_view_component.js";
import { FunComponent } from "./components/fun_component.js";
import { GrabbableSpawnerComponent } from "./components/grabbable_spawner_component.js";
import { LoadAudioComponent } from "./components/load_audio_component.js";
import { ParticleComponent } from "./components/particle_component.js";
import { ParticlesSpawnerComponent } from "./components/particles_spawner_component.js";
import { PlayMusicComponent } from "./components/play_music_component.js";
import { PlaygroundGatewayComponent } from "./components/playground_gateway_component.js";
import { ScaleOnSpawnComponent } from "./components/scale_on_spawn_component.js";
import { SFXOnCollisionComponent } from "./components/sfx_on_collision_component.js";
import { SFXOnGrabThrowComponent } from "./components/sfx_on_grab_throw_component.js";
import { TargetHitCheckComponent } from "./components/target_hit_check_component.js";
import { WaveMovementComponent } from "./components/wave_movement_component.js";

export function initPlayground(engine) {
    registerPlaygroundComponents(engine);
}

export function registerPlaygroundComponents(engine) {
    engine.registerComponent(FadeViewComponent);
    engine.registerComponent(GrabbableSpawnerComponent);
    engine.registerComponent(LoadAudioComponent);
    engine.registerComponent(ParticleComponent);
    engine.registerComponent(PlaygroundGatewayComponent);
    engine.registerComponent(ParticlesSpawnerComponent);
    engine.registerComponent(PlayMusicComponent);
    engine.registerComponent(ScaleOnSpawnComponent);
    engine.registerComponent(SFXOnCollisionComponent);
    engine.registerComponent(SFXOnGrabThrowComponent);
    engine.registerComponent(TargetHitCheckComponent);
    engine.registerComponent(WaveMovementComponent);
    engine.registerComponent(FunComponent);
}