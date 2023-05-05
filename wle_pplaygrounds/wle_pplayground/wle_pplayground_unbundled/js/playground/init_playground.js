import { FadeViewComponent } from "./fade_view_component";
import { FunComponent } from "./fun_component";
import { GrabbableSpawnerComponent } from "./grabbable_spawner_component";
import { LoadAudioComponent } from "./load_audio_component";
import { ParticleComponent } from "./particle_component";
import { ParticlesSpawnerComponent } from "./particles_spawner_component";
import { PlayMusicComponent } from "./play_music_component";
import { PlaygroundGatewayComponent } from "./playground_gateway_component";
import { ScaleOnSpawnComponent } from "./scale_on_spawn_component";
import { SFXOnCollisionComponent } from "./sfx_on_collision_component";
import { SFXOnGrabThrowComponent } from "./sfx_on_grab_throw_component";
import { TargetHitCheckComponent } from "./target_hit_check_component";
import { WaveMovementComponent } from "./wave_movement_component";

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