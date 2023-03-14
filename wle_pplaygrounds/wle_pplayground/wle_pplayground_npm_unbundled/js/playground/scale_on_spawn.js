WL.registerComponent("scale-on-spawn", {
    _myStartDelay: { type: WL.Type.Float, default: 0.0 },
    _myScaleDuration: { type: WL.Type.Float, default: 0.0 }
}, {
    init() {
        this._myTargetScale = this.object.pp_getScale();
    },
    start() {
        this.object.pp_setScale(0.00001);

        this._myDelayTimer = new PP.Timer(this._myStartDelay);
        this._myScaleDurationTimer = new PP.Timer(this._myScaleDuration);
    },
    update(dt) {
        if (this._myDelayTimer.isRunning()) {
            this._myDelayTimer.update(dt);
        } else if (this._myScaleDurationTimer.isRunning()) {
            this._myScaleDurationTimer.update(dt);

            this.object.pp_setScale(this._myTargetScale.vec3_scale(PP.EasingFunction.easeOut(this._myScaleDurationTimer.getPercentage())));
        }
    },
    pp_clone(targetObject) {
        let clonedComponent = targetObject.pp_addComponent(this.type);

        clonedComponent._myStartDelay = this._myStartDelay;
        clonedComponent._myScaleDuration = this._myScaleDuration;

        clonedComponent._myTargetScale.vec3_copy(this._myTargetScale);

        clonedComponent.start();

        return clonedComponent;
    }
});