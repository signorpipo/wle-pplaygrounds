import { Component, Property } from "@wonderlandengine/api";
import { Globals } from "../../../pp/globals.js";
import { ConsoleVRWidget, ConsoleVRWidgetParams } from "../console_vr_widget.js";

export class ConsoleVRToolComponent extends Component {
    static TypeName = "pp-console-vr-tool";
    static Properties = {
        _myHandedness: Property.enum(["None", "Left", "Right"], "None"),
        _myOverrideBrowserConsoleFunctions: Property.enum(["None", "All", "Errors & Warns"], "All"),
        _myShowOnStart: Property.bool(false),
        _myShowVisibilityButton: Property.bool(false),
        _myPulseOnNewMessage: Property.enum(["Never", "Always", "When Hidden"], "Never")
    };

    start() {
        this._myStarted = false;

        if (Globals.isToolEnabled(this.engine)) {
            this._myWidget = new ConsoleVRWidget(this.engine);

            let params = new ConsoleVRWidgetParams(this.engine);
            params.myHandedness = [null, "left", "right"][this._myHandedness];
            params.myOverrideBrowserConsoleFunctions = this._myOverrideBrowserConsoleFunctions;
            params.myShowOnStart = this._myShowOnStart;
            params.myShowVisibilityButton = this._myShowVisibilityButton;
            params.myPulseOnNewMessage = this._myPulseOnNewMessage;
            params.myPlaneMaterial = Globals.getDefaultMaterials(this.engine).myFlatOpaque.clone();
            params.myTextMaterial = Globals.getDefaultMaterials(this.engine).myText.clone();

            this._myWidget.start(this.object, params);

            this._myStarted = true;
        }
    }

    update(dt) {
        if (Globals.isToolEnabled(this.engine)) {
            if (this._myStarted) {
                this._myWidget.setActive(true);
                this._myWidget.update(dt);
            }
        } else if (this._myStarted) {
            this._myWidget.setActive(false);
        }
    }

    onDeactivate() {
        if (this._myStarted) {
            this._myWidget.setActive(false);
        }
    }

    onDestroy() {
        if (this._myStarted) {
            this._myWidget.destroy();
        }
    }
}