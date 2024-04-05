import { Component, Object3D, Scene, type ComponentConstructor } from "@wonderlandengine/api";
import { ObjectUtils } from "./object_utils.js";

export function getRoot(scene: Readonly<Scene>): Object3D {
    return ObjectUtils.wrapObject(0, scene.engine)!;
}

export function addObject(scene: Scene): Object3D {
    return ObjectUtils.addObject(SceneUtils.getRoot(scene));
}

export function getObjects(scene: Readonly<Scene>): Object3D[] {
    return SceneUtils.getObjectsBreadth(scene);
}

export function getObjectsBreadth(scene: Readonly<Scene>): Object3D[] {
    return ObjectUtils.getHierarchyBreadth(SceneUtils.getRoot(scene));
}

export function getObjectsDepth(scene: Readonly<Scene>): Object3D[] {
    return ObjectUtils.getHierarchyDepth(SceneUtils.getRoot(scene));
}

// Get Component   

export function getComponent<T extends Component>(scene: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index: number = 0): T | null {
    return SceneUtils.getComponentBreadth(scene, classOrType, index);
}

export function getComponentBreadth<T extends Component>(scene: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index: number = 0): T | null {
    return ObjectUtils.getComponentHierarchyBreadth(SceneUtils.getRoot(scene), classOrType, index);
}

export function getComponentDepth<T extends Component>(scene: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index: number = 0): T | null {
    return ObjectUtils.getComponentHierarchyDepth(SceneUtils.getRoot(scene), classOrType, index);
}

export function getComponents<T extends Component>(scene: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[] {
    return SceneUtils.getComponentsBreadth(scene, classOrType);
}

export function getComponentsBreadth<T extends Component>(scene: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[] {
    return ObjectUtils.getComponentsHierarchyBreadth(SceneUtils.getRoot(scene), classOrType);
}

export function getComponentsDepth<T extends Component>(scene: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[] {
    return ObjectUtils.getComponentsHierarchyDepth(SceneUtils.getRoot(scene), classOrType);
}

// Get Object By Name

export function getObjectByName(scene: Readonly<Scene>, name: string, isRegex: boolean = false, index: number = 0): Object3D | null {
    return SceneUtils.getObjectByNameBreadth(scene, name, isRegex, index);
}

export function getObjectByNameBreadth(scene: Readonly<Scene>, name: string, isRegex: boolean = false, index: number = 0): Object3D | null {
    return ObjectUtils.getObjectByNameHierarchyBreadth(SceneUtils.getRoot(scene), name, isRegex, index);
}

export function getObjectByNameDepth(scene: Readonly<Scene>, name: string, isRegex: boolean = false, index: number = 0): Object3D | null {
    return ObjectUtils.getObjectByNameHierarchyDepth(SceneUtils.getRoot(scene), name, isRegex, index);
}

export function getObjectsByName(scene: Readonly<Scene>, name: string, isRegex: boolean = false): Object3D[] {
    return SceneUtils.getObjectsByNameBreadth(scene, name, isRegex);
}

export function getObjectsByNameBreadth(scene: Readonly<Scene>, name: string, isRegex: boolean = false): Object3D[] {
    return ObjectUtils.getObjectsByNameHierarchyBreadth(SceneUtils.getRoot(scene), name, isRegex);
}

export function getObjectsByNameDepth(scene: Readonly<Scene>, name: string, isRegex: boolean = false): Object3D[] {
    return ObjectUtils.getObjectsByNameHierarchyDepth(SceneUtils.getRoot(scene), name, isRegex);
}

// Get Object By ID

export function getObjectByID(scene: Readonly<Scene>, id: number): Object3D | null {
    return SceneUtils.getObjectByIDBreadth(scene, id);
}

export function getObjectByIDBreadth(scene: Readonly<Scene>, id: number): Object3D | null {
    return ObjectUtils.getObjectByIDHierarchyBreadth(SceneUtils.getRoot(scene), id);
}

export function getObjectByIDDepth(scene: Readonly<Scene>, id: number): Object3D | null {
    return ObjectUtils.getObjectByIDHierarchyDepth(SceneUtils.getRoot(scene), id);
}

// To String

export function toString(scene: Readonly<Scene>): string {
    return SceneUtils.toStringCompact(scene);
}

export function toStringCompact(scene: Readonly<Scene>): string {
    return ObjectUtils.toStringCompact(SceneUtils.getRoot(scene));
}

export function toStringExtended(scene: Readonly<Scene>): string {
    return ObjectUtils.toStringExtended(SceneUtils.getRoot(scene));
}

// Cauldron

export function getComponentsAmountMap(scene: Readonly<Scene>, outComponentsAmountMap: Map<string, number> = new Map()): Map<string, number> {
    return ObjectUtils.getComponentsAmountMap(SceneUtils.getRoot(scene), outComponentsAmountMap);
}

export const SceneUtils = {
    getRoot,
    addObject,
    getObjects,
    getObjectsBreadth,
    getObjectsDepth,
    getComponent,
    getComponentBreadth,
    getComponentDepth,
    getComponents,
    getComponentsBreadth,
    getComponentsDepth,
    getObjectByName,
    getObjectByNameBreadth,
    getObjectByNameDepth,
    getObjectsByName,
    getObjectsByNameBreadth,
    getObjectsByNameDepth,
    getObjectByID,
    getObjectByIDBreadth,
    getObjectByIDDepth,
    toString,
    toStringCompact,
    toStringExtended,
    getComponentsAmountMap
} as const;