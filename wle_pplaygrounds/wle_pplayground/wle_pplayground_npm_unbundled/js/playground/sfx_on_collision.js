WL.registerComponent("sfx-on-collision", {
}, {
    init() {
    },
    start() {
        this._myPhysX = this.object.pp_getComponent('physx');
        this._myCollisionsCollector = new PP.PhysicsCollisionCollector(this._myPhysX, true);

        this._mySFX = PP.myAudioManager.createAudioPlayer("collision");

        this._myGrabbable = this.object.pp_getComponent("pp-grabbable");
        this._myLastLastGrabbed = this._myGrabbable.isGrabbed();
        this._myLastGrabbed = this._myGrabbable.isGrabbed();
    },
    update(dt) {
        this._myCollisionsCollector.update(dt);

        if (this._myCollisionsCollector.getCollisionsStart().length > 0 && this._myLastLastGrabbed == this._myGrabbable.isGrabbed()) {
            this._mySFX.setPosition(this.object.pp_getPosition());
            this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
            this._mySFX.play();
        }

        this._myLastLastGrabbed = this._myLastGrabbed;
        this._myLastGrabbed = this._myGrabbable.isGrabbed(); // fix a physX bug that trigger a collision start when kinematic is changed
    },
    pp_clone(targetObject) {
        let clonedComponent = targetObject.pp_addComponent(this.type);

        return clonedComponent;
    }
});