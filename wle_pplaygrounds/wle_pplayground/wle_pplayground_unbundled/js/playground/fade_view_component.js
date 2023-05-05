import { Component, Property } from "@wonderlandengine/api";
import { EasingFunction, Globals, Timer, VisualMesh, VisualMeshParams, vec3_create, vec4_create } from "../pp";

export class FadeViewComponent extends Component {
    static TypeName = "fade-view";
    static Properties = {
        _myColor: Property.string("0, 0, 0"),
        _myTimeToFadeIn: Property.float(0),
        _myStartDelay: Property.float(0)
    };

    start() {
        this._myStartTimer = new Timer(this._myStartDelay);
        this._myFadeInTimer = new Timer(this._myTimeToFadeIn, false);

        this._myColorVector = vec4_create(0, 0, 0, 1);
        let colorRGB = [...this._myColor.split(",")];
        this._myColorVector[0] = parseInt(colorRGB[0]) / 255;
        this._myColorVector[1] = parseInt(colorRGB[1]) / 255;
        this._myColorVector[2] = parseInt(colorRGB[2]) / 255;

        this._myFadeMaterial = Globals.getDefaultMaterials(this.engine).myFlatTransparentNoDepth.clone();
        this._myFadeMaterial.color = this._myColorVector;

        this._myFadeParentObject = this.object.pp_addObject();

        let fadeVisualParams = new VisualMeshParams(this.engine);
        fadeVisualParams.myMesh = Globals.getDefaultMeshes(this.engine).myInvertedSphere;
        fadeVisualParams.myMaterial = this._myFadeMaterial;
        fadeVisualParams.myParent = this._myFadeParentObject;
        fadeVisualParams.myLocal = true;
        fadeVisualParams.myTransform.mat4_setScale(vec3_create(0.1, 0.1, 0.1));
        this._myFadeVisual = new VisualMesh(fadeVisualParams);

        this._myFadeParentObject.pp_setParent(Globals.getPlayerObjects(this.engine).myHead, false);
        this._myFadeParentObject.pp_resetTransformLocal();
    }

    update(dt) {
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

    onDestroy() {
        this._myFadeVisual.destroy();
    }
}