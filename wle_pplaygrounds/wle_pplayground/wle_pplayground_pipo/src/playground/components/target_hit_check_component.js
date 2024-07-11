import { Component, PhysXComponent } from "@wonderlandengine/api";
import { Globals, GrabbableComponent, PhysicsCollisionCollector } from "wle-pp";
import { ParticlesSpawnerComponent } from "./particles_spawner_component.js";

export class TargetHitCheckComponent extends Component {
    static TypeName = "target-hit-check";
    static Properties = {};

    start() {
        this._myTrigger = this.object.pp_getComponent(PhysXComponent);
        this._myParticlesSpawner = Globals.getRootObject(this.engine).pp_getComponent(ParticlesSpawnerComponent);
        this._myCollisionsCollector = new PhysicsCollisionCollector(this._myTrigger);

        this._myStarted = false;
    }

    update(dt) {
        if (!this._myStarted) {
            this._mySFX = Globals.getAudioManager(this.engine).createAudioPlayer("strike");

            this._myStarted = true;
        }

        this._myCollisionsCollector.update(dt);

        let collisionsStart = this._myCollisionsCollector.getCollisionsStarted();
        for (let collisionStart of collisionsStart) {
            if (collisionStart.object.pp_getComponent(GrabbableComponent) != null) {
                this._strike(collisionStart.object);
            }
        }
    }

    _strike(strikeSource) {
        this._mySFX.setPosition(strikeSource.pp_getPosition());
        this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._mySFX.play();

        this._myParticlesSpawner.spawn(strikeSource.pp_getPosition());
    }

    onDestroy() {
        this._myCollisionsCollector.destroy();
    }
}