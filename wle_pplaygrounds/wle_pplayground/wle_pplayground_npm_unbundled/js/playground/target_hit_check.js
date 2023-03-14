WL.registerComponent("target-hit-check", {
}, {
    init() {
    },
    start() {
        this._myTrigger = this.object.pp_getComponent("physx");
        this._myParticlesSpawner = WL.scene.pp_getRoot().pp_getComponent("particles-spawner");
        this._myCollisionsCollector = new PP.PhysicsCollisionCollector(this._myTrigger, true);

        this._mySFX = PP.myAudioManager.createAudioPlayer("strike");
    },
    update(dt) {
        this._myCollisionsCollector.update(dt);

        let collisionsStart = this._myCollisionsCollector.getCollisionsStart();
        for (let collisionStart of collisionsStart) {
            if (collisionStart.pp_getComponent("pp-grabbable") != null) {
                this._strike(collisionStart);
            }
        }
    },
    _strike(strikeSource) {
        this._mySFX.setPosition(strikeSource.pp_getPosition());
        this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._mySFX.play();

        this._myParticlesSpawner.spawn(strikeSource.pp_getPosition());
    }
});