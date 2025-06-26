import { Component, MeshComponent, Property } from "@wonderlandengine/api";
import { Globals, ObjectCloneParams, ObjectPool, ObjectPoolParams } from "wle-pp";
import { ParticleComponent } from "./particle_component.js";

export class ParticlesSpawnerComponent extends Component {
    static TypeName = "particles-spawner";
    static Properties = {
        _myParticlesContainer: Property.object(),
        _myRadius: Property.float(0.25)
    };

    start() {
        this._myStartFrameCountdown = 1;
    }

    _start() {
        this._myParticles = this._myParticlesContainer?.pp_getChildren() ?? [];

        this._myObjectPoolManagerPrefix = "particles_spawner_" + Math.pp_randomUUID() + "_particle_";
        this._myParticlePoolIDs = new Map();

        let poolParams = new ObjectPoolParams();

        poolParams.myInitialPoolSize = 10;
        poolParams.myAmountToAddWhenEmpty = 1;
        poolParams.myPercentageToAddWhenEmpty = 1;

        let cloneParams = new ObjectCloneParams();
        cloneParams.myComponentsToInclude.push(MeshComponent.TypeName);

        for (let i = 0; i < this._myParticles.length; i++) {
            let particle = this._myParticles[i].pp_clone(cloneParams);
            particle.pp_addComponent(ParticleComponent);
            particle.pp_setActive(false);
            particle.pp_setParent(Globals.getSceneObjects(this.engine).myParticles);

            Globals.getObjectPoolManager(this.engine).addPool(this._getParticlePoolID(i), new ObjectPool(particle, poolParams));
        }
    }

    update(dt) {
        if (this._myStartFrameCountdown > 0) {
            this._myStartFrameCountdown--;
            if (this._myStartFrameCountdown == 0) {
                this._start();
            }
        }
    }

    spawn(position) {
        if (this._myStartFrameCountdown == 0 && this._myParticles.length > 0) {
            let amount = Math.pp_randomInt(15, 30);

            for (let i = 0; i < amount; i++) {
                let particle = Globals.getObjectPoolManager(this.engine).get(this._getParticlePoolID(Math.pp_randomInt(0, this._myParticles.length - 1)));
                particle.pp_getComponent(ParticleComponent).onDone(this._onParticleDone.bind(this, particle));

                particle.pp_setPosition(position.vec3_add(particle.pp_getComponent(ParticleComponent)._myHorizontalSpeed.vec3_normalize().vec3_scale(Math.pp_random(0, this._myRadius))));

                particle.pp_setActive(true);
            }
        }
    }

    _onParticleDone(particle) {
        Globals.getObjectPoolManager(this.engine).release(particle);
    }

    _getParticlePoolID(particleIndex) {
        let poolID = this._myParticlePoolIDs.get(particleIndex);

        if (poolID == null) {
            poolID = this._myObjectPoolManagerPrefix + particleIndex;
            this._myParticlePoolIDs.set(particleIndex, poolID);
        }

        return poolID;
    }

    onDeactivate() {
        for (let poolID of this._myParticlePoolIDs.values()) {
            Globals.getObjectPoolManager(this.engine)?.releaseAll(poolID);
        }
    }

    onDestroy() {
        for (let poolID of this._myParticlePoolIDs.values()) {
            Globals.getObjectPoolManager(this.engine)?.destroyPool(poolID);
        }
    }
}