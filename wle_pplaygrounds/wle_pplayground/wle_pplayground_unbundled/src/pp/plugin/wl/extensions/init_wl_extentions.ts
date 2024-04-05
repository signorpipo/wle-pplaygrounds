import { initCauldronExtensions } from "./cauldron_extensions.js";
import { initObjectExtension } from "./object_extension.js";
import { initSceneExtension } from "./scene_extension.js";

/**
 *  TS import preserver
 * 
 *  This is only needed to make it so the import is not removed, since it makes the type extensions available to the Typescript 
 */
import "./cauldron_extensions.js";
import "./object_extension.js";
import "./scene_extension.js";

export function initWLExtensions(): void {
    initObjectExtension();
    initSceneExtension();
    initCauldronExtensions();
}