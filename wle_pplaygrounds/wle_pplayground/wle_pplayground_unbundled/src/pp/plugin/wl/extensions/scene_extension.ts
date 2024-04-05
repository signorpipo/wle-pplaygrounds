import { Component, Object3D, Scene, type ComponentConstructor } from "@wonderlandengine/api";
import { SceneUtils } from "../../../cauldron/wl/utils/scene_utils.js";
import { PluginUtils } from "../../utils/plugin_utils.js";

import "./scene_type_extension.js";

export function initSceneExtension(): void {
    _initSceneExtensionPrototype();
}

function _initSceneExtensionPrototype(): void {

    const sceneExtension: Record<string, any> = {};

    sceneExtension.pp_getRoot = function pp_getRoot(this: Readonly<Scene>): Object3D {
        return SceneUtils.getRoot(this);
    };

    sceneExtension.pp_addObject = function pp_addObject(this: Scene): Object3D {
        return SceneUtils.addObject(this);
    };

    sceneExtension.pp_getObjects = function pp_getObjects(this: Readonly<Scene>): Object3D[] {
        return SceneUtils.getObjects(this);
    };

    sceneExtension.pp_getObjectsBreadth = function pp_getObjectsBreadth(this: Readonly<Scene>): Object3D[] {
        return SceneUtils.getObjectsBreadth(this);
    };

    sceneExtension.pp_getObjectsDepth = function pp_getObjectsDepth(this: Readonly<Scene>): Object3D[] {
        return SceneUtils.getObjectsDepth(this);
    };

    // Get Component    

    sceneExtension.pp_getComponent = function pp_getComponent<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index?: number): T | null {
        return SceneUtils.getComponent(this, classOrType, index);
    };

    sceneExtension.pp_getComponentBreadth = function pp_getComponentBreadth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index?: number): T | null {
        return SceneUtils.getComponentBreadth(this, classOrType, index);
    };

    sceneExtension.pp_getComponentDepth = function pp_getComponentDepth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index?: number): T | null {
        return SceneUtils.getComponentDepth(this, classOrType, index);
    };

    sceneExtension.pp_getComponents = function pp_getComponents<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[] {
        return SceneUtils.getComponents(this, classOrType);
    };

    sceneExtension.pp_getComponentsBreadth = function pp_getComponentsBreadth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[] {
        return SceneUtils.getComponentsBreadth(this, classOrType);
    };

    sceneExtension.pp_getComponentsDepth = function pp_getComponentsDepth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[] {
        return SceneUtils.getComponentsDepth(this, classOrType);
    };

    // Get Object By Name

    sceneExtension.pp_getObjectByName = function pp_getObjectByName(this: Readonly<Scene>, name: string, isRegex?: boolean, index?: number): Object3D | null {
        return SceneUtils.getObjectByName(this, name, isRegex, index);
    };

    sceneExtension.pp_getObjectByNameBreadth = function pp_getObjectByNameBreadth(this: Readonly<Scene>, name: string, isRegex?: boolean, index?: number): Object3D | null {
        return SceneUtils.getObjectByNameBreadth(this, name, isRegex, index);
    };

    sceneExtension.pp_getObjectByNameDepth = function pp_getObjectByNameDepth(this: Readonly<Scene>, name: string, isRegex?: boolean, index?: number): Object3D | null {
        return SceneUtils.getObjectByNameDepth(this, name, isRegex, index);
    };

    sceneExtension.pp_getObjectsByName = function pp_getObjectsByName(this: Readonly<Scene>, name: string, isRegex?: boolean): Object3D[] {
        return SceneUtils.getObjectsByName(this, name, isRegex);
    };

    sceneExtension.pp_getObjectsByNameBreadth = function pp_getObjectsByNameBreadth(this: Readonly<Scene>, name: string, isRegex?: boolean): Object3D[] {
        return SceneUtils.getObjectsByNameBreadth(this, name, isRegex);
    };

    sceneExtension.pp_getObjectsByNameDepth = function pp_getObjectsByNameDepth(this: Readonly<Scene>, name: string, isRegex?: boolean): Object3D[] {
        return SceneUtils.getObjectsByNameDepth(this, name, isRegex);
    };

    // Get Object By ID

    sceneExtension.pp_getObjectByID = function pp_getObjectByID(this: Readonly<Scene>, id: number): Object3D | null {
        return SceneUtils.getObjectByID(this, id);
    };

    sceneExtension.pp_getObjectByIDBreadth = function pp_getObjectByIDBreadth(this: Readonly<Scene>, id: number): Object3D | null {
        return SceneUtils.getObjectByIDBreadth(this, id);
    };

    sceneExtension.pp_getObjectByIDDepth = function pp_getObjectByIDDepth(this: Readonly<Scene>, id: number): Object3D | null {
        return SceneUtils.getObjectByIDDepth(this, id);
    };

    // To String

    sceneExtension.pp_toString = function pp_toString(this: Readonly<Scene>): string {
        return SceneUtils.toString(this);
    };

    sceneExtension.pp_toStringCompact = function pp_toStringCompact(this: Readonly<Scene>): string {
        return SceneUtils.toStringCompact(this);
    };

    sceneExtension.pp_toStringExtended = function pp_toStringExtended(this: Readonly<Scene>): string {
        return SceneUtils.toStringExtended(this);
    };

    // Cauldron

    sceneExtension.pp_getComponentsAmountMap = function pp_getComponentsAmountMap(this: Readonly<Scene>, outComponentsAmountMap?: Map<string, number>): Map<string, number> {
        return SceneUtils.getComponentsAmountMap(this, outComponentsAmountMap);
    };



    PluginUtils.injectProperties(sceneExtension, Scene.prototype, false, true, true);
}