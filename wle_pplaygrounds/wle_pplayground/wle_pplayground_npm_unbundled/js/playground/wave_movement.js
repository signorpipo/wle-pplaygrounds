WL.registerComponent("wave-movement", {
}, {
    init() {
    },
    start() {
        this._myStartPosition = this.object.pp_getPosition();

        this._myCurrentTimes = [0, 0, 0];
        this._mySpeedMultipliers = [this._randomSpeedMultiplier(), this._randomSpeedMultiplier(), this._randomSpeedMultiplier()];
        this._mySpeedMultiplierTimers = [this._randomTimer(), this._randomTimer(), this._randomTimer()];

        this._myMaxDistances = [3, 1, 0.5];

        this._myRandomSigns = [Math.pp_randomPick(-1, 1), Math.pp_randomPick(-1, 1), Math.pp_randomPick(-1, 1)];
    },
    update(dt) {
        for (let i = 0; i < this._myCurrentTimes.length; i++) {
            this._myCurrentTimes[i] += dt * this._mySpeedMultipliers[i];
        }

        this.object.pp_setPosition(this._myStartPosition);
        this.object.pp_translateObject([
            Math.sin(this._myCurrentTimes[0]) * this._myMaxDistances[0] * this._myRandomSigns[0],
            Math.sin(this._myCurrentTimes[1]) * this._myMaxDistances[1] * this._myRandomSigns[1],
            Math.sin(this._myCurrentTimes[2]) * this._myMaxDistances[2] * this._myRandomSigns[2]
        ]);

        for (let i = 0; i < this._mySpeedMultiplierTimers.length; i++) {
            this._mySpeedMultiplierTimers[i].update(dt);
            if (this._mySpeedMultiplierTimers[i].isDone()) {
                this._mySpeedMultiplierTimers[i] = this._randomTimer();
                this._mySpeedMultipliers[i] = this._randomSpeedMultiplier();
            }
        }

    },
    _randomTimer() {
        return new PP.Timer(Math.pp_random(1, 5));
    },
    _randomSpeedMultiplier() {
        return Math.pp_random(0.5, 2);
    }
});