WL.registerComponent("fade-view", {
    _myColor: { type: WL.Type.String, default: "0, 0, 0" },
    _myTimeToFadeIn: { type: WL.Type.Float, default: 0 },
    _myStartDelay: { type: WL.Type.Float, default: 0 },
}, {
    init() {
    },
    start() {
        this._myStartTimer = new PP.Timer(this._myStartDelay);
        this._myFadeInTimer = new PP.Timer(this._myTimeToFadeIn, false);

        this._myColorVector = PP.vec4_create(0, 0, 0, 1);
        let colorRGB = [...this._myColor.split(",")];
        this._myColorVector[0] = parseInt(colorRGB[0]) / 255;
        this._myColorVector[1] = parseInt(colorRGB[1]) / 255;
        this._myColorVector[2] = parseInt(colorRGB[2]) / 255;

        this._myFadeMaterial = PP.myDefaultResources.myMaterials.myFlatTransparentNoDepth.clone();
        this._myFadeMaterial.color = this._myColorVector;

        this._myFadeParentObject = this.object.pp_addObject();

        let fadeVisualParams = new PP.VisualMeshParams();
        fadeVisualParams.myMesh = PP.myDefaultResources.myMeshes.myInvertedSphere;
        fadeVisualParams.myMaterial = this._myFadeMaterial;
        fadeVisualParams.myParent = this._myFadeParentObject;
        fadeVisualParams.myIsLocal = true;
        fadeVisualParams.myTransform.mat4_setScale(PP.vec3_create(0.1, 0.1, 0.1));
        this._myFadeVisual = new PP.VisualMesh(fadeVisualParams);

        this._myFadeParentObject.pp_setParent(PP.myPlayerObjects.myHead, false);
        this._myFadeParentObject.pp_resetTransformLocal();
    },
    update(dt) {
        if (this._myStartTimer.isRunning()) {
            this._myStartTimer.update(dt);
            if (this._myStartTimer.isDone()) {
                this._myFadeInTimer.start();
            }
        } else if (this._myFadeInTimer.isRunning()) {
            this._myFadeInTimer.update(dt);
            this._myColorVector[3] = 1 - PP.EasingFunction.easeOut(this._myFadeInTimer.getPercentage());
            if (this._myFadeInTimer.isDone()) {
                this._myColorVector[3] = 0;
            }

            this._myFadeMaterial.color = this._myColorVector;
        }
    }
});