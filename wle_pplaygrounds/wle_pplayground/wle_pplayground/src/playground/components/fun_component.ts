import { Component } from "@wonderlandengine/api";
import { GamepadButtonID, Globals } from "wle-pp";
import { ParticlesSpawnerComponent } from "./particles_spawner_component.js";

export class FunComponent extends Component {
    public static override TypeName = "fun";

    private _myParticlesSpawner!: ParticlesSpawnerComponent;

    public override start(): void {
        this._myParticlesSpawner = Globals.getRootObject(this.engine)!.pp_getComponent(ParticlesSpawnerComponent)!;
    }

    public override update(dt: number): void {
        this._fun();
    }

    public _fun(): void {
        if (Globals.getLeftGamepad(this.engine)!.getButtonInfo(GamepadButtonID.SELECT).isPressed()) {
            this._myParticlesSpawner.spawn(this.object.pp_getPosition());
        }
    }
}