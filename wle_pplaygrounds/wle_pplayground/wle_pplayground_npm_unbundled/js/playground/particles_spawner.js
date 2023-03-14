WL.registerComponent("particles-spawner", {
    _myParticlesContainer: { type: WL.Type.Object },
    _myRadius: { type: WL.Type.Float, default: 0.25 }
}, {
    init() {
    },
    start() {
        this._myParticles = this._myParticlesContainer.pp_getChildren();

        this._myObjectPoolsManager = new PP.ObjectPoolsManager();
        let poolParams = new PP.ObjectPoolParams();

        poolParams.myInitialPoolSize = 10;
        poolParams.myAmountToAddWhenEmpty = 1;
        poolParams.myPercentageToAddWhenEmpty = 1;

        poolParams.myOptimizeObjectsAllocation = true;    //If true it will pre-allocate the memory before adding new objects to the pool

        let cloneParams = new PP.CloneParams();
        cloneParams.myComponentsToInclude.push("mesh");

        for (let i = 0; i < this._myParticles.length; i++) {
            let particle = this._myParticles[i].pp_clone(cloneParams);
            particle.pp_addComponent("particle");
            particle.pp_setActive(false);

            this._myObjectPoolsManager.addPool(i, particle, poolParams);
        }
    },
    update(dt) {
    },
    spawn(position) {
        let amount = Math.pp_randomInt(15, 30);

        for (let i = 0; i < amount; i++) {
            let particle = this._myObjectPoolsManager.getObject(Math.pp_randomInt(0, this._myParticles.length - 1));
            particle.pp_getComponent("particle").onDone(this.onParticleDone.bind(this, particle));

            particle.pp_setPosition(position.vec3_add(particle.pp_getComponent("particle")._myHorizontalSpeed.vec3_normalize().vec3_scale(Math.pp_random(0, this._myRadius))));

            particle.pp_setActive(true);
        }
    },
    onParticleDone(particle) {
        this._myObjectPoolsManager.releaseObject(particle);
    }
});