import { Component, PhysXComponent } from "@wonderlandengine/api";
import { ComponentUtils, Globals, GrabbableComponent, PhysicsCollisionCollector } from "../../pp/index.js";

export class SFXOnCollisionComponent extends Component {
    static TypeName = "sfx-on-collision";
    static Properties = {};

    start() {
        this._myPhysX = this.object.pp_getComponent(PhysXComponent);
        if (this._myPhysX != null) {
            this._myCollisionsCollector = new PhysicsCollisionCollector(this._myPhysX);
        }

        this._myGrabbable = this.object.pp_getComponent(GrabbableComponent);
        if (this._myGrabbable != null) {
            this._myLastLastGrabbed = this._myGrabbable.isGrabbed();
            this._myLastGrabbed = this._myGrabbable.isGrabbed();
        }

        this._myStarted = false;
    }

    update(dt) {
        if (!this._myStarted) {
            this._mySFX = Globals.getAudioManager(this.engine).createAudioPlayer("collision");

            this._myStarted = true;
        }

        this._myCollisionsCollector.update(dt);

        if (this._myCollisionsCollector.getCollisionsStart().length > 0 && this._myLastLastGrabbed == this._myGrabbable.isGrabbed()) {
            this._mySFX.setPosition(this.object.pp_getPosition());
            this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
            this._mySFX.play();
        }

        this._myLastLastGrabbed = this._myLastGrabbed;
        this._myLastGrabbed = this._myGrabbable.isGrabbed(); // Fix a physX bug that trigger a collision start when kinematic is changed
    }

    pp_clone(targetObject) {
        let clonedComponent = ComponentUtils.cloneDefault(this, targetObject);

        return clonedComponent;
    }

    pp_clonePostProcess(clonedComponent) {
        clonedComponent.start();
    }

    onDestroy() {
        this._myCollisionsCollector.destroy();
    }
}