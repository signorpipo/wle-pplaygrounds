import { Component, Property } from "@wonderlandengine/api";
import { quat2_create, quat_create, vec3_create, vec4_create } from "../../plugin/js/extensions/array_extension";
import { Globals } from "../../pp/globals";
import { Timer } from "../cauldron/timer";
import { XRUtils } from "../utils/xr_utils";
import { VisualText, VisualTextParams } from "../visual/elements/visual_text";

export class ShowFPSComponent extends Component {
    static TypeName = "pp-show-fps";
    static Properties = {
        _myLookAtPlayer: Property.bool(true),
        _myOffsetX: Property.float(0),
        _myOffsetY: Property.float(0),
        _myOffsetZ: Property.float(0),
        _myRefreshSeconds: Property.float(0.25),
        _myTextMaterial: Property.material()
    };

    start() {
        this._myStarted = false;

        if (Globals.isDebugEnabled(this.engine)) {
            this._myTimer = new Timer(this._myRefreshSeconds);
            this._myTotalDT = 0;
            this._myFrames = 0;

            this._myVisualFPSParent = this.object.pp_addObject();

            let visualParams = new VisualTextParams(this.engine);
            visualParams.myText = "00";

            visualParams.myTransform.mat4_setPositionRotationScale(vec3_create(-0.25 - this._myOffsetX, -0.130 + this._myOffsetY, 0.35 + this._myOffsetZ), vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));

            if (this._myTextMaterial != null) {
                visualParams.myMaterial = this._myTextMaterial.clone();
            } else {
                visualParams.myMaterial = Globals.getDefaultMaterials(this.engine).myText.clone();
                visualParams.myMaterial.color = vec4_create(1, 1, 1, 1);
            }

            visualParams.myParent = this._myVisualFPSParent;
            visualParams.myLocal = true;

            this._myVisualFPS = new VisualText(visualParams);

            //Globals.getEasyTuneVariables(this.engine).add(new EasyTuneNumber("FPS X", -0.25, 0.1, 3, undefined, undefined, this.engine));
            //Globals.getEasyTuneVariables(this.engine).add(new EasyTuneNumber("FPS Y", -0.130, 0.1, 3, undefined, undefined, this.engine));
            //Globals.getEasyTuneVariables(this.engine).add(new EasyTuneNumber("FPS Z", 0.35, 0.1, 3, undefined, undefined, this.engine));

            this._myStarted = true;
        }
    }

    update(dt) {
        // Implemented outside class definition
    }

    onDestroy() {
        if (this._myStarted) {
            this._myVisualFPS.destroy();
        }
    }
}



// IMPLEMENTATION

ShowFPSComponent.prototype.update = function () {
    let playerHeadTransformQuat = quat2_create();
    let fpsRotationQuat = quat_create();
    let up = vec3_create(0, 1, 0);
    let lookToForward = vec3_create();
    return function update(dt) {
        if (this._myStarted) {
            this._myTotalDT += dt;
            this._myFrames++;

            this._myTimer.update(dt);
            if (this._myTimer.isDone()) {
                this._myTimer.start();

                let fps = Math.round(this._myFrames / this._myTotalDT);

                let visualParams = this._myVisualFPS.getParams();

                if (XRUtils.isSessionActive(this.engine)) {
                    visualParams.myTransform.mat4_setPositionRotationScale(vec3_create(-0.115 - this._myOffsetX, -0.115 + this._myOffsetY, 0.35 + this._myOffsetZ), vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));

                    if (this._myLookAtPlayer) {
                        lookToForward = visualParams.myTransform.mat4_getPosition(lookToForward).vec3_negate(lookToForward).vec3_normalize(lookToForward);
                        fpsRotationQuat = visualParams.myTransform.mat4_getRotationQuat(fpsRotationQuat);
                        fpsRotationQuat.quat_setForward(lookToForward, up, fpsRotationQuat);
                        visualParams.myTransform.mat4_setRotationQuat(fpsRotationQuat);
                    }
                } else {
                    visualParams.myTransform.mat4_setPositionRotationScale(vec3_create(-0.25 - this._myOffsetX, -0.130 + this._myOffsetY, 0.35 + this._myOffsetZ), vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));
                }

                //visualParams.myTransform.mat4_setPositionRotationScale([Globals.getEasyTuneVariables(this.engine).get("FPS X"), Globals.getEasyTuneVariables(this.engine).get("FPS Y"), Globals.getEasyTuneVariables(this.engine).get("FPS Z")], vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));

                visualParams.myText = fps.toFixed(0);
                this._myVisualFPS.paramsUpdated();

                this._myTotalDT = 0;
                this._myFrames = 0;
            }

            playerHeadTransformQuat = Globals.getPlayerObjects(this.engine).myHead.pp_getTransformQuat(playerHeadTransformQuat);
            this._myVisualFPSParent.pp_setTransformQuat(playerHeadTransformQuat);
        }
    };
}();