/**
 * Warning: this type extension is actually added at runtime only if you call `initSceneExtension`
 *          the `initPP` function, which is automatically called by the `pp-gateway` component, does this for you
 */

/**
 *  How to use
 * 
 *  On some of the functions u can specify if the algorithm should explore by Breadth/Depth, example:
 *      - pp_getObjectByNameBreadth
 *      - pp_getComponentsDepth
 * 
 *  By default the functions explore by Breadth
*/

import { Component, Object3D, Scene, type ComponentConstructor } from "@wonderlandengine/api";

export interface SceneExtension {
    pp_getRoot(this: Readonly<Scene>): Object3D;

    pp_addObject(this: Scene): Object3D;

    pp_getObjects(this: Readonly<Scene>): Object3D[];
    pp_getObjectsBreadth(this: Readonly<Scene>): Object3D[];
    pp_getObjectsDepth(this: Readonly<Scene>): Object3D[];

    pp_getComponent<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index?: number): T | null;
    pp_getComponentBreadth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index?: number): T | null;
    pp_getComponentDepth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string, index?: number): T | null;
    pp_getComponents<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[];
    pp_getComponentsBreadth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[];
    pp_getComponentsDepth<T extends Component>(this: Readonly<Scene>, classOrType: ComponentConstructor<T> | string): T[];

    pp_getObjectByName(this: Readonly<Scene>, name: string, isRegex?: boolean, index?: number): Object3D | null;
    pp_getObjectByNameBreadth(this: Readonly<Scene>, name: string, isRegex?: boolean, index?: number): Object3D | null;
    pp_getObjectByNameDepth(this: Readonly<Scene>, name: string, isRegex?: boolean, index?: number): Object3D | null;
    pp_getObjectsByName(this: Readonly<Scene>, name: string, isRegex?: boolean): Object3D[];
    pp_getObjectsByNameBreadth(this: Readonly<Scene>, name: string, isRegex?: boolean): Object3D[];
    pp_getObjectsByNameDepth(this: Readonly<Scene>, name: string, isRegex?: boolean): Object3D[];

    pp_getObjectByID(this: Readonly<Scene>, id: number): Object3D | null;
    pp_getObjectByIDBreadth(this: Readonly<Scene>, id: number): Object3D | null;
    pp_getObjectByIDDepth(this: Readonly<Scene>, id: number): Object3D | null;

    pp_toString(this: Readonly<Scene>): string;
    pp_toStringCompact(this: Readonly<Scene>): string;
    pp_toStringExtended(this: Readonly<Scene>): string;

    pp_getComponentsAmountMap(this: Readonly<Scene>, outComponentsAmountMap?: Map<string, number>): Map<string, number>;
}

declare module "@wonderlandengine/api" {
    export interface Scene extends SceneExtension { }
}