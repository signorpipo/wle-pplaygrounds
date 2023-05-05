import { Component } from "@wonderlandengine/api";
import { initPlayground } from "./init_playground";

let _alreadyRegisteredEngines = [];

export class PlaygroundGatewayComponent extends Component {
    static TypeName = "playground-gateway";
    static Properties = {};

    static onRegister(engine) {
        if (!_alreadyRegisteredEngines.includes(engine)) {
            _alreadyRegisteredEngines.push(engine)
            initPlayground(engine);
        }
    }
}