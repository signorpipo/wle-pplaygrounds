import { Component, Object3D, PhysXComponent, TextComponent } from "@wonderlandengine/api";
import { property } from "@wonderlandengine/api/decorators.js";
import { Cursor } from "@wonderlandengine/components";
import { AnimatedNumber, AnimatedNumberParams, CursorButtonActionsHandler, CursorButtonComponent, Vector3, vec3_create } from "wle-pp";

export class ToggleHowToTextComponent extends Component implements CursorButtonActionsHandler {
    public static override TypeName = "toggle-how-to-text";

    @property.object()
    private readonly _myTextObject!: Object3D;

    private readonly _myAnimatedScale!: AnimatedNumber;

    private _myTextObjectInitialPositionLocal!: Vector3;
    private _myTextPhysXComponent!: PhysXComponent;
    private _myTextVisible: boolean = true;

    public override init(): void {
        this._myTextObjectInitialPositionLocal = this._myTextObject.pp_getPositionLocal();
        this._myTextPhysXComponent = this._myTextObject.pp_getComponent(PhysXComponent)!;

        // Just to show how to use the cursor button handler from the class
        const textComponents = this.object.pp_getComponents(TextComponent);
        let visible = true;
        const switchButtonTextHandler = {
            onUp(cursorButtonComponent: CursorButtonComponent, cursorComponent: Cursor, isSecondaryCursor: boolean): boolean {
                if (isSecondaryCursor) return false;

                let textToSet = "Show";
                if (visible) {
                    visible = false;
                } else {
                    visible = true;
                    textToSet = "Hide";
                }

                for (const textComponent of textComponents) {
                    textComponent.text = textToSet;
                }

                return false;
            }
        };

        CursorButtonComponent.addButtonActionHandler("switch-button-text", switchButtonTextHandler, this.engine);
    }

    public override start(): void {
        const animatedScaleParams = new AnimatedNumberParams();
        animatedScaleParams.myInitialValue = 1;
        animatedScaleParams.myAnimationSeconds = 0.5;
        (this._myAnimatedScale as AnimatedNumber) = new AnimatedNumber(animatedScaleParams);

    }

    public override update(dt: number): void {
        if (!this._myAnimatedScale.isDone()) {
            this._myAnimatedScale.update(dt);

            this._myTextObject.pp_resetScaleLocal();
            this._myTextObject.pp_scaleObject(this._myAnimatedScale.getCurrentValue());

            if (this._myAnimatedScale.isDone()) {
                if (!this._myTextVisible) {
                    this._myTextObject.pp_translate(vec3_create(0, -100000, 0));
                }
            }
        }
    }

    public onUp(cursorButtonComponent: CursorButtonComponent, cursorComponent: Cursor, isSecondaryCursor: boolean): boolean {
        if (isSecondaryCursor) return false;

        if (!this._myTextVisible) {
            this._myAnimatedScale.setTargetValue(1);
        } else {
            this._myAnimatedScale.setTargetValue(0);
        }

        this._myTextObject.pp_setPositionLocal(this._myTextObjectInitialPositionLocal);

        this._myTextVisible = !this._myTextVisible;
        this._myTextPhysXComponent.active = this._myTextVisible;

        return false;
    }
}