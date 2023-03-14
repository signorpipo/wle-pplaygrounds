WL.registerComponent("particle", {
}, {
    init() {
        this._myOnDoneCallback = null;
        this._myTargetScale = [1, 1, 1];
    },
    start() {
        this.object.pp_setScale(0.00001);

        this._myLifeTimer = new PP.Timer(Math.pp_random(0.5, 1), false);
        this._mySpawnTimer = new PP.Timer(Math.pp_random(0.15, 0.3));
        this._myUnspawnTimer = new PP.Timer(Math.pp_random(0.15, 0.3), false);
    },
    update(dt) {
        if (this._mySpawnTimer.isRunning()) {
            this._mySpawnTimer.update(dt);

            this.object.pp_setScale(this._myTargetScale.vec3_scale(PP.EasingFunction.easeOut(this._mySpawnTimer.getPercentage())));
            this._myLifeTimer.start();
        }

        if (this._myLifeTimer.isRunning()) {
            this._myLifeTimer.update(dt);
            if (this._myLifeTimer.isDone()) {
                this._myUnspawnTimer.start();
            }
        }

        if (this._myUnspawnTimer.isRunning()) {
            this._myUnspawnTimer.update(dt);

            this.object.pp_setScale(this._myTargetScale.vec3_scale(PP.EasingFunction.easeOut(1 - this._mySpawnTimer.getPercentage())));

            if (this._myUnspawnTimer.isDone()) {
                if (this._myOnDoneCallback != null) {
                    this._myOnDoneCallback();
                }
            }
        }
    },
    onDone(onDoneCallback) {
        this._myOnDoneCallback = onDoneCallback;
    },
    onDeactivate() {
        this._myOnDoneCallback = null;
    },
    pp_clone(targetObject) {
        let clonedComponent = targetObject.pp_addComponent(this.type);

        return clonedComponent;
    }
});