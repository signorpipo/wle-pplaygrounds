# Overview

A collection of playground template projects for the [Wonderland Engine](https://wonderlandengine.com/).

The projects include the [PP library](https://github.com/SignorPipo/wle-pp).

If u prefer to start with a default template project that uses the PP library, you can use the [PPefault template](https://github.com/SignorPipo/wle-ppefault) instead.

A collection of assets that can be useful while working with the Wonderland Engine (like gamepads 3D models) can be found [here](https://github.com/SignorPipo/wle-assets).

# License

Copyright (c) 2022-2024 [Elia "Pipo" Ducceschi](https://signor-pipo.itch.io/).

Released under the [ISC License](https://github.com/SignorPipo/wle-pplaygrounds/blob/main/LICENSE.md).
  
# Credits

- [Meta Quest 1 Gamepads Low Poly](https://github.com/SignorPipo/wle-pplaygrounds/tree/main/wle_pplaygrounds/wle_pplayground/wle_pplayground/assets/models/pp/meta_quest_1_gamepads_credits_Jezza3D.fbx) by [Jezza3D](https://sketchfab.com/Jezza3D)
- Made using [PP](https://github.com/SignorPipo/wle-pp)

# Playgrounds

## Table Of Contents

- [PPlayground](#pplayground)

## Playgrounds Versions

Every playground template usually comes in two versions:
- standard
  * the PP library is included as an `npm` package
- unbundled
  * the PP library is not included as an `npm` package, but as files in the project
  * can be useful if u plan to edit the PP library to adjust them to your need

## PPlayground

[Playground Folder](https://github.com/SignorPipo/wle-pplaygrounds/tree/main/wle_pplaygrounds/wle_pplayground)

[Live Version](https://signor-pipo.itch.io/pplayground-wonderland-engine)

The main playground.

Some of the PP features u will find in this playground are:
- ppefault setup
- player locomotion
- grab & throw
- virtual gamepad

Some of the custom features u will find in this playground are:
- background music
- sfx for the grab & throw and other interactions
- particles
- grabbable objects spawner
- a bit of gameplay logic to check when u have hit the flying target

Every custom component or object that is not strictly needed has been added under the `Playground` object inside the scene, so you can safely remove it.  
This is also true for every custom scripts, which can be found in the `playground` folder.

### Downloads

You can download this template through the following links:
  * [`wle_pplayground`](https://github.com/SignorPipo/wle-pplaygrounds/releases/latest/download/wle_pplayground.zip)
  * [`wle_pplayground_unbundled`](https://github.com/SignorPipo/wle-pplaygrounds/releases/latest/download/wle_pplayground_unbundled.zip)
