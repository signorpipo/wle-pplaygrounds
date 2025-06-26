import { Component, Object3D, property } from "@wonderlandengine/api";
import { Globals, InputSourceType, XRUtils } from "wle-pp";

export class TeleportOnTrackedHandsComponent extends Component {
    public static override TypeName = "teleport-on-tracked-hands";

    @property.object()
    private _myTeleportTargetObject!: Object3D;

    private _myUsingTrackedHands: boolean = false;
    private _myDelayFrameCountdown: number = 3;

    public override update(dt: number): void {
        if (this._myTeleportTargetObject == null) return;

        if (this._myDelayFrameCountdown > 0) {
            this._myDelayFrameCountdown--;
        }

        if (XRUtils.isSessionActive(this.engine) && Globals.getPlayerLocomotion(this.engine)?.getPlayerHeadManager().isSynced() && this._myDelayFrameCountdown == 0) {
            if (Globals.getLeftHandPose(this.engine)!.getInputSourceType() != null && Globals.getRightHandPose(this.engine)!.getInputSourceType() != null) {
                if (Globals.getLeftHandPose(this.engine)!.getInputSourceType() == InputSourceType.TRACKED_HAND && Globals.getRightHandPose(this.engine)!.getInputSourceType() == InputSourceType.TRACKED_HAND) {
                    if (!this._myUsingTrackedHands) {
                        this._myUsingTrackedHands = true;

                        Globals.getPlayerLocomotion(this.engine)!.getPlayerTransformManager().forceTeleportAndReset(this._myTeleportTargetObject.pp_getPosition(), this._myTeleportTargetObject.pp_getRotationQuat());
                    }
                } else if (Globals.getLeftHandPose(this.engine)!.getInputSourceType() != InputSourceType.TRACKED_HAND && Globals.getRightHandPose(this.engine)!.getInputSourceType() != InputSourceType.TRACKED_HAND) {
                    this._myUsingTrackedHands = false;
                }
            }
        }
    }

    public override onActivate(): void {
        XRUtils.registerSessionStartEventListener(this, this._onXRSessionStart.bind(this), false, false, this.engine);
    }

    public override onDeactivate(): void {
        XRUtils.unregisterSessionStartEventListener(this, this.engine);
    }

    private _onXRSessionStart(): void {
        this._myDelayFrameCountdown = 3;

        this._myUsingTrackedHands = false;
    }
}