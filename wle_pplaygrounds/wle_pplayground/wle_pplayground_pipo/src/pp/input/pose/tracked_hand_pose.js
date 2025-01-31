import { Globals } from "../../pp/globals.js";
import { TrackedHandJointID } from "../cauldron/input_types.js";
import { InputUtils } from "../cauldron/input_utils.js";
import { BasePoseParams } from "./base_pose.js";
import { TrackedHandJointPose } from "./tracked_hand_joint_pose.js";

export class TrackedHandPoseParams extends BasePoseParams {

    constructor(addAllJointIDs = true, engine = Globals.getMainEngine()) {
        super(engine);

        this.myTrackedHandJointIDList = [];
        this._myActive = true;

        if (addAllJointIDs) {
            for (let key in TrackedHandJointID) {
                this.myTrackedHandJointIDList.push(TrackedHandJointID[key]);
            }
        }
    }
}

export class TrackedHandPose {

    constructor(handedness, trackedHandPoseParams = new TrackedHandPoseParams()) {
        this._myHandedness = handedness;

        this._myForwardFixed = trackedHandPoseParams.myForwardFixed;
        this._myForceEmulatedVelocities = trackedHandPoseParams.myForceEmulatedVelocities;
        this._myReferenceObject = trackedHandPoseParams.myReferenceObject;

        this._myEngine = trackedHandPoseParams.myEngine;
        this._myActive = true;

        this._myTrackedHandJointPoseParams = new BasePoseParams(this._myEngine);
        this._myTrackedHandJointPoseParams.myForwardFixed = this._myForwardFixed;
        this._myTrackedHandJointPoseParams.myForceEmulatedVelocities = this._myForceEmulatedVelocities;
        this._myTrackedHandJointPoseParams.myReferenceObject = this._myReferenceObject;

        this._myTrackedHandJointPoses = [];
        for (let jointID of trackedHandPoseParams.myTrackedHandJointIDList) {
            let trackedHandJointPose = new TrackedHandJointPose(this._myHandedness, jointID, this._myTrackedHandJointPoseParams);
            this._myTrackedHandJointPoses[jointID] = trackedHandJointPose;
        }
    }

    setActive(active) {
        this._myActive = active;

        for (let jointPose of this._myTrackedHandJointPoses) {
            jointPose.setActive(active);
        }
    }

    isActive() {
        return this._myActive;
    }

    start() {
        for (let jointPoseKey in this._myTrackedHandJointPoses) {
            let jointPose = this._myTrackedHandJointPoses[jointPoseKey];
            jointPose.start();
        }
    }

    update(dt) {
        if (!this._myActive) return;

        for (let jointPoseKey in this._myTrackedHandJointPoses) {
            let jointPose = this._myTrackedHandJointPoses[jointPoseKey];
            jointPose.update(dt);
        }
    }

    getEngine() {
        return this._myEngine;
    }

    getHandedness() {
        return this._myHandedness;
    }

    getJointPose(jointID) {
        return this._myTrackedHandJointPoses[jointID];
    }

    getJointPoseByIndex(jointIDIndex) {
        return this._myTrackedHandJointPoses[InputUtils.getJointIDByIndex(jointIDIndex)];
    }

    getJointPoses() {
        return this._myTrackedHandJointPoses;
    }

    addTrackedHandJointID(jointID) {
        if (!this._myTrackedHandJointPoses.pp_has(element => element.getTrackedHandJointID() == jointID)) {
            let trackedHandJointPose = new TrackedHandJointPose(this._myHandedness, jointID, this._myTrackedHandJointPoseParams);
            this._myTrackedHandJointPoses.push(trackedHandJointPose);
        }
    }

    removeTrackedHandJointID(jointID) {
        this._myTrackedHandJointPoses.pp_remove(element => element.getTrackedHandJointID() == jointID);
    }

    setReferenceObject(referenceObject) {
        this._myReferenceObject = referenceObject;
        this._myTrackedHandJointPoseParams.myReferenceObject = this._myReferenceObject;
        for (let jointPoseKey in this._myTrackedHandJointPoses) {
            let jointPose = this._myTrackedHandJointPoses[jointPoseKey];
            jointPose.setReferenceObject(referenceObject);
        }
    }

    getReferenceObject() {
        return this._myReferenceObject;
    }

    setForwardFixed(forwardFixed) {
        this._myForwardFixed = forwardFixed;
        this._myTrackedHandJointPoseParams.myForwardFixed = this._myForwardFixed;
        for (let jointPoseKey in this._myTrackedHandJointPoses) {
            let jointPose = this._myTrackedHandJointPoses[jointPoseKey];
            jointPose.setForwardFixed(forwardFixed);
        }
    }

    isForwardFixed() {
        return this._myForwardFixed;
    }

    setForceEmulatedVelocities(forceEmulatedVelocities) {
        this._myForceEmulatedVelocities = forceEmulatedVelocities;
        this._myTrackedHandJointPoseParams.myForceEmulatedVelocities = this._myForceEmulatedVelocities;
        for (let jointPoseKey in this._myTrackedHandJointPoses) {
            let jointPose = this._myTrackedHandJointPoses[jointPoseKey];
            jointPose.setForceEmulatedVelocities(forceEmulatedVelocities);
        }
    }

    isForceEmulatedVelocities() {
        return this._myForceEmulatedVelocities;
    }

    destroy() {
        this._myDestroyed = true;

        this.setActive(false);

        for (let jointPose of this._myTrackedHandJointPoses) {
            jointPose.destroy();
        }
    }

    isDestroyed() {
        return this._myDestroyed;
    }
}