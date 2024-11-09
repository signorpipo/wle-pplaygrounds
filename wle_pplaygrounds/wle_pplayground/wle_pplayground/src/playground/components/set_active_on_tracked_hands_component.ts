import { Component, property } from "@wonderlandengine/api";
import { Globals, InputSourceType } from "wle-pp";

export class SetActiveOnMobileComponent extends Component {
    public static override  TypeName = "set-active-on-tracked-hands";

    @property.bool(false)
    private _myActiveOnTrackedHands!: boolean;

    public override update(dt: number): void {
        if (Globals.getLeftHandPose(this.engine)!.getInputSourceType() != null && Globals.getRightHandPose(this.engine)!.getInputSourceType() != null) {
            if (Globals.getLeftHandPose(this.engine)!.getInputSourceType() == InputSourceType.TRACKED_HAND && Globals.getRightHandPose(this.engine)!.getInputSourceType() == InputSourceType.TRACKED_HAND) {
                this.object.pp_setActiveDescendants(this._myActiveOnTrackedHands);
            } else {
                this.object.pp_setActiveDescendants(!this._myActiveOnTrackedHands);
            }
        }
    }
}