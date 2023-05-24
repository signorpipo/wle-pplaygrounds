import { FadeViewComponent } from "./components/fade_view_component";
import { FunComponent } from "./components/fun_component";
import { GrabbableSpawnerComponent } from "./components/grabbable_spawner_component";
import { LoadAudioComponent } from "./components/load_audio_component";
import { ParticleComponent } from "./components/particle_component";
import { ParticlesSpawnerComponent } from "./components/particles_spawner_component";
import { PlayMusicComponent } from "./components/play_music_component";
import { PlaygroundGatewayComponent } from "./components/playground_gateway_component";
import { ScaleOnSpawnComponent } from "./components/scale_on_spawn_component";
import { SFXOnCollisionComponent } from "./components/sfx_on_collision_component";
import { SFXOnGrabThrowComponent } from "./components/sfx_on_grab_throw_component";
import { TargetHitCheckComponent } from "./components/target_hit_check_component";
import { WaveMovementComponent } from "./components/wave_movement_component";

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