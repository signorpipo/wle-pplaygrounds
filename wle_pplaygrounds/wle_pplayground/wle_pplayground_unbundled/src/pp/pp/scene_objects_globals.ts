import { WonderlandEngine } from "@wonderlandengine/api";
import { Globals } from "./globals.js";
import { PlayerObjects, SceneObjects } from "./scene_objects.js";

const _mySceneObjectsContainer: WeakMap<Readonly<WonderlandEngine>, SceneObjects> = new WeakMap();

export function getSceneObjects(engine: Readonly<WonderlandEngine> | null = Globals.getMainEngine()): SceneObjects | null {
    if (engine == null) return null;

    const sceneObjects = _mySceneObjectsContainer.get(engine);
    return sceneObjects != null ? sceneObjects : null;
}

export function setSceneObjects(sceneObjects: SceneObjects, engine: Readonly<WonderlandEngine> | null = Globals.getMainEngine()): void {
    if (engine != null) {
        _mySceneObjectsContainer.set(engine, sceneObjects);
    }
}

export function removeSceneObjects(engine: Readonly<WonderlandEngine> | null = Globals.getMainEngine()): void {
    if (engine != null) {
        _mySceneObjectsContainer.delete(engine);
    }
}

export function hasSceneObjects(engine: Readonly<WonderlandEngine> | null = Globals.getMainEngine()): boolean {
    return engine != null ? _mySceneObjectsContainer.has(engine) : false;
}

export function getPlayerObjects(engine: Readonly<WonderlandEngine> | null = Globals.getMainEngine()): PlayerObjects | null {
    const sceneObjects = getSceneObjects(engine);

    if (sceneObjects != null) {
        return sceneObjects.myPlayerObjects;
    }

    return null;
}