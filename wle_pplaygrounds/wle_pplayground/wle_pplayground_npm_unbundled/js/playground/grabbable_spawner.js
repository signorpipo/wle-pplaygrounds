WL.registerComponent("grabbable-spawner", {
    _myPrototypesContainer: { type: WL.Type.Object }
}, {
    init() {
    },
    start() {
        this._myPrototypes = this._myPrototypesContainer.pp_getChildren();

        this._myCurrentGrabbable = null;

        this._myStarted = false;
    },
    update(dt) {
        if (!this._myStarted) {
            this._myStarted = true;

            for (let prototype of this._myPrototypes) {
                prototype.pp_setActive(false);
            }

            this._spawn();
        }

        if (this._myCurrentGrabbable != null) {
            if (this.object.pp_getPosition().vec3_distance(this._myCurrentGrabbable.pp_getPosition()) > 0.2) {
                this._spawn();
            }
        }
    },
    _spawn() {
        this._myCurrentGrabbable = Math.pp_randomPick(this._myPrototypes).pp_clone();
        this._myCurrentGrabbable.pp_setPosition(this.object.pp_getPosition());
        this._myCurrentGrabbable.pp_setActive(true);
    }
});