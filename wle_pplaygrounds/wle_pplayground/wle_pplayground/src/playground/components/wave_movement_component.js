import { Component } from "@wonderlandengine/api";
import { EasyTuneNumber, Globals, Timer } from "wle-pp";

export class WaveMovementComponent extends Component {
    static TypeName = "wave-movement";

    start() {
        this._myStartTimer = new Timer(0);

        this._myStartPosition = this.object.pp_getPosition();

        this._myCurrentTimes = [Math.pp_random(0, 100), Math.pp_random(0, 100), Math.pp_random(0, 100)];

        this._myChangeParamsTimers = [new Timer(3), this._randomTimer(), this._randomTimer()];

        this._mySpeedMultipliers = [this._randomSpeedMultiplier(), this._randomSpeedMultiplier(), this._randomSpeedMultiplier()];

        this._myMaxDistanceMiddles = [3, 1, 0.5];
        this._myMaxDistances = [this._randomMaxDistance(this._myMaxDistanceMiddles[0]), this._randomMaxDistance(this._myMaxDistanceMiddles[1]), this._randomMaxDistance(this._myMaxDistanceMiddles[2])];

        this._myMaxDistanceTargets = this._myMaxDistances.pp_clone();
        this._mySpeedMultiplierTargets = this._mySpeedMultipliers.pp_clone();

        this._myRandomSigns = [Math.pp_randomPick(-1, 1), Math.pp_randomPick(-1, 1), Math.pp_randomPick(-1, 1)];

        Globals.getEasyTuneVariables(this.engine).add(new EasyTuneNumber("Wave Speed Multiplier", 1.00, null, true, 2, 5, undefined, undefined, undefined, this.engine));
    }

    update(dt) {
        if (this._myStartTimer.isRunning()) {
            this._myStartTimer.update(dt);
        } else {
            for (let i = 0; i < this._myCurrentTimes.length; i++) {
                this._myCurrentTimes[i] += dt * this._mySpeedMultipliers[i] * Globals.getEasyTuneVariables(this.engine).get("Wave Speed Multiplier");
            }

            this.object.pp_setPosition(this._myStartPosition);
            this.object.pp_translateObject([
                Math.sin(this._myCurrentTimes[0]) * this._myMaxDistances[0] * this._myRandomSigns[0],
                Math.sin(this._myCurrentTimes[1]) * this._myMaxDistances[1] * this._myRandomSigns[1],
                Math.sin(this._myCurrentTimes[2]) * this._myMaxDistances[2] * this._myRandomSigns[2]
            ]);

            for (let i = 0; i < this._myChangeParamsTimers.length; i++) {
                this._myChangeParamsTimers[i].update(dt);
                if (this._myChangeParamsTimers[i].isDone()) {
                    this._myChangeParamsTimers[i] = this._randomTimer();
                    this._mySpeedMultiplierTargets[i] = this._randomSpeedMultiplier();
                    this._myMaxDistanceTargets[i] = this._randomMaxDistance(this._myMaxDistanceMiddles[i]);
                }
            }

            for (let i = 0; i < this._mySpeedMultipliers.length; i++) {
                this._mySpeedMultipliers[i] = Math.pp_lerp(this._mySpeedMultipliers[i], this._mySpeedMultiplierTargets[i], 0.3 * dt);
            }

            for (let i = 0; i < this._myMaxDistances.length; i++) {
                this._myMaxDistances[i] = Math.pp_lerp(this._myMaxDistances[i], this._myMaxDistanceTargets[i], 0.3 * dt);
            }
        }
    }

    _randomTimer() {
        return new Timer(Math.pp_random(4, 8));
    }

    _randomSpeedMultiplier() {
        return Math.pp_random(0.25, 1.5);
    }

    _randomMaxDistance(middle) {
        return Math.pp_random(middle - middle / 3, middle + middle / 3);
    }
}