WL.registerComponent("grabbable-spawner", {
    _myPrototypesContainer: { type: WL.Type.Object }
}, {
    init() {
    },
    start() {
        this._myPrototypes = this._myPrototypesContainer.pp_getChildren();
        this._myCurrentGrabbable = null;

        this._myFirstUpdate = true;
        this._myStartTimer = new PP.Timer(0.5);
    },
    update(dt) {
        if (this._myFirstUpdate) {
            this._myFirstUpdate = false;

            for (let prototype of this._myPrototypes) {
                prototype.pp_setActive(false);
            }
        } else {
            if (this._myStartTimer.isRunning()) {
                this._myStartTimer.update(dt);
                if (this._myStartTimer.isDone()) {
                    this._spawn();
                }
            } else {
                if (this._myCurrentGrabbable != null) {
                    if (this.object.pp_getPosition().vec3_distance(this._myCurrentGrabbable.pp_getPosition()) > 0.2) {
                        this._spawn();
                    }
                }
            }
        }
    },
    _spawn() {
        this._myCurrentGrabbable = Math.pp_randomPick(this._myPrototypes).pp_clone();
        this._myCurrentGrabbable.pp_setParent(this.object);
        this._myCurrentGrabbable.pp_setPosition(this.object.pp_getPosition());
        this._myCurrentGrabbable.pp_setActive(true);
    }
});