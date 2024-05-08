import { Component, Property } from "@wonderlandengine/api";
import { BrowserUtils } from "wle-pp";

export class SetActiveOnMobileComponent extends Component {
    static TypeName = "set-active-on-mobile";
    static Properties = {
        _myActiveOnMobile: Property.bool(false)
    };

    update(dt) {
        if ((BrowserUtils.isMobile() && !this._myActiveOnMobile) || (!BrowserUtils.isMobile() && this._myActiveOnMobile)) {
            this.object.pp_setActiveDescendants(false);
        } else {
            this.object.pp_setActiveDescendants(true);
        }
    }
}