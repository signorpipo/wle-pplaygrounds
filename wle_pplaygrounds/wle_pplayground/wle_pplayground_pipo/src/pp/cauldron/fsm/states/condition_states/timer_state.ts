import { Timer } from "../../../cauldron/timer.js";
import { FSM, StateData, TransitionData } from "../../fsm.js";
import { State } from "../../state.js";
import { BaseConditionState } from "./base_condition_state.js";

export class TimerState extends BaseConditionState implements State {

    private readonly _myTimer: Timer;

    constructor(duration: number = 0, transitionToPerformOnEnd: unknown, ...transitionArgs: unknown[]) {
        super(() => this._myTimer.isDone(), transitionToPerformOnEnd, ...transitionArgs);

        this._myTimer = new Timer(duration, false);
    }

    public setDuration(duration: number): void {
        this._myTimer.setDuration(duration);
    }

    public onEnd(listener: () => void, id?: unknown): void {
        this._myTimer.onEnd(listener, id);
    }

    public unregisterOnEnd(id?: unknown): void {
        this._myTimer.unregisterOnEnd(id);
    }

    public update(dt: number, fsm: FSM): void {
        this._myTimer.update(dt);

        super._update(dt, fsm);
    }

    public start(fsm: FSM, transitionData: Readonly<TransitionData>, duration?: number, transitionToPerformOnEnd?: unknown, ...transitionArgs: unknown[]): void {
        this._myTimer.start(duration);

        super._start(fsm, transitionData, undefined, transitionToPerformOnEnd, ...transitionArgs);
    }

    public init(fsm: FSM, stateData: Readonly<StateData>, duration?: number, transitionToPerformOnEnd?: unknown, ...transitionArgs: unknown[]): void {
        this._myTimer.start(duration);

        super._init(fsm, stateData, undefined, transitionToPerformOnEnd, ...transitionArgs);
    }
}