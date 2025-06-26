import { Component, Property } from "@wonderlandengine/api";
import { EasingFunction, Globals, Timer, VisualMesh, VisualMeshParams, XRUtils, vec3_create, vec4_create } from "wle-pp";

export class FadeViewComponent extends Component {
    static TypeName = "fade-view";
    static Properties = {
        _myColor: Property.string("0, 0, 0"),
        _myTimeToFadeIn: Property.float(0),
        _myStartDelay: Property.float(0)
    };

    start() {
        this._myFadeVisual = null;
        this._myFirstUpdate = true;

        this._myRegisterXREvents = false;
    }

    _start() {
        this._myStartTimer = new Timer(this._myStartDelay);
        this._myFadeInTimer = new Timer(this._myTimeToFadeIn, false);

        this._myColorVector = vec4_create(0, 0, 0, 1);
        let colorRGB = [...this._myColor.split(",")];
        this._myColorVector[0] = parseInt(colorRGB[0]) / 255;
        this._myColorVector[1] = parseInt(colorRGB[1]) / 255;
        this._myColorVector[2] = parseInt(colorRGB[2]) / 255;

        this._myFadeMaterial = Globals.getDefaultMaterials(this.engine).myFlatTransparentNoDepth.clone();
        this._myFadeMaterial.color = this._myColorVector;

        this._myFadeParentObject = this.object.pp_addChild();

        let fadeVisualParams = new VisualMeshParams(this.engine);
        fadeVisualParams.myMesh = Globals.getDefaultMeshes(this.engine).myInvertedSphere;
        fadeVisualParams.myMaterial = this._myFadeMaterial;
        fadeVisualParams.myParent = this._myFadeParentObject;
        fadeVisualParams.myLocal = true;
        fadeVisualParams.myTransform.mat4_setScale(vec3_create(1));
        this._myFadeVisual = new VisualMesh(fadeVisualParams);
        this._myFadeVisual.setVisible(true);

        this._myFadeParentObject.pp_setParent(Globals.getPlayerObjects(this.engine).myCameraNonXR, false);

    }

    update(dt) {
        if (this._myFirstUpdate) {
            this._start();
            this._myFirstUpdate = false;
        }

        if (this._myRegisterXREvents) {
            XRUtils.registerSessionStartEndEventListeners(this, this._onXRSessionStart.bind(this), this._onXRSessionEnd.bind(this), true, false, this.engine);
            this._myRegisterXREvents = false;
        }

        if (this._myStartTimer.isRunning()) {
            this._myStartTimer.update(dt);
            if (this._myStartTimer.isDone()) {
                this._myFadeInTimer.start();
            }
        } else if (this._myFadeInTimer.isRunning()) {
            this._myFadeInTimer.update(dt);
            this._myColorVector[3] = 1 - EasingFunction.easeIn(this._myFadeInTimer.getPercentage());
            if (this._myFadeInTimer.isDone()) {
                this._myColorVector[3] = 0;
            }

            this._myFadeMaterial.color = this._myColorVector;
        }
    }

    _onXRSessionStart() {
        this._myFadeParentObject.pp_setParent(Globals.getPlayerObjects(this.engine).myEyeLeft, false);
    }

    _onXRSessionEnd() {
        this._myFadeParentObject.pp_setParent(Globals.getPlayerObjects(this.engine).myCameraNonXR, false);
    }

    onActivate() {
        if (this._myFadeVisual != null) {
            this._myFadeVisual.setVisible(true);
        }

        this._myRegisterXREvents = true;
    }

    onDeactivate() {
        if (this._myFadeVisual != null) {
            this._myFadeVisual.setVisible(false);
        }

        XRUtils.unregisterSessionStartEndEventListeners(this, this.engine);
    }

    onDestroy() {
        if (this._myFadeVisual != null) {
            this._myFadeVisual.destroy();
        }
    }
}