WL.registerComponent("particles-spawner", {
    _myParticlesContainer: { type: WL.Type.Object }
}, {
    init() {
    },
    start() {
        this._myParticles = this._myParticlesContainer.pp_getChildren();

        this._myObjectPoolManager = new PP.ObjectPoolManager();
        let poolParams = new PP.ObjectPoolParams();


        for (let i = 0; i < this._myParticles.length; i++) {
        }

    },
    update(dt) {
    },
    spaw(position) {

    }
});