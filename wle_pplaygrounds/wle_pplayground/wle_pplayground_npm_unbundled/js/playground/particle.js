WL.registerComponent("particle", {
}, {
    init() {
        this._myOnDoneCallback = null;
    },
    start() {
        let randomScale = Math.pp_random(0.5, 1);
        this._myTargetScale = PP.vec3_create(randomScale, randomScale, randomScale);

        this.object.pp_setScale(0.00001);
        this.object.pp_rotate(PP.vec3_create(Math.pp_random(-180, 180), Math.pp_random(-180, 180), Math.pp_random(-180, 180)));

        this._mySpawnTimer = new PP.Timer(Math.pp_random(0.1, 0.2));
        this._myLifeTimer = new PP.Timer(Math.pp_random(0.35, 0.7), false);
        this._myUnspawnTimer = new PP.Timer(Math.pp_random(0.1, 0.2), false);

        this._myHorizontalSpeed = PP.vec3_create(0, 0, 1).vec3_rotateAxis(Math.pp_random(-180, 180), PP.vec3_create(0, 1, 0));
        this._myHorizontalSpeed.vec3_scale(Math.pp_random(2, 10));
        this._myVerticalSpeed = PP.vec3_create(0, 1, 0).vec3_scale(Math.pp_random(2, 4));
    },
    update(dt) {
        if (this._mySpawnTimer.isRunning()) {
            this._mySpawnTimer.update(dt);

            this.object.pp_setScale(this._myTargetScale.vec3_scale(PP.EasingFunction.easeOut(this._mySpawnTimer.getPercentage())));

            if (this._mySpawnTimer.isDone()) {
                this._myLifeTimer.start();
            }
        }

        if (this._myLifeTimer.isRunning()) {
            this._myLifeTimer.update(dt);
            if (this._myLifeTimer.isDone()) {
                this._myUnspawnTimer.start();
            }
        }

        if (this._myUnspawnTimer.isRunning()) {
            this._myUnspawnTimer.update(dt);

            this.object.pp_setScale(this._myTargetScale.vec3_scale(PP.EasingFunction.easeOut(1 - this._myUnspawnTimer.getPercentage())));

            if (this._myUnspawnTimer.isDone()) {
                if (this._myOnDoneCallback != null) {
                    this._myOnDoneCallback();
                }
            }
        }

        this.object.pp_translate(this._myHorizontalSpeed.vec3_scale(dt));
        this.object.pp_translate(this._myVerticalSpeed.vec3_scale(dt));

        this._myVerticalSpeed = this._myVerticalSpeed.vec3_sub(PP.vec3_create(0, 1, 0).vec3_scale(9.81 * dt), this._myVerticalSpeed);
    },
    onDone(onDoneCallback) {
        this._myOnDoneCallback = onDoneCallback;
    },
    onDeactivate() {
        this._myOnDoneCallback = null;
    },
    onActivate() {
        this.start();
    },
    pp_clone(targetObject) {
        let clonedComponent = targetObject.pp_addComponent(this.type);

        return clonedComponent;
    }
});