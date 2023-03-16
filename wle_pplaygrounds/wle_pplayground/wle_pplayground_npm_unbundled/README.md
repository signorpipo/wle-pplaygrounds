# Overview

A collection of playground template projects for the [Wonderland Engine](https://wonderlandengine.com/).

The projects include the [PP library](https://github.com/SignorPipo/wle_pp).

If u prefer to start with a default template project that uses the PP library, you can use the [ppefault template](https://github.com/SignorPipo/wle_ppefault) instead.

A collection of assets that can be useful while working with the Wonderland Engine (like gamepads 3D models) can be found [here](https://github.com/SignorPipo/wle_assets).

# Playgrounds

## Table Of Contents

- [PPlayground](#pplayground)

## Playgrounds Versions

Every playground template usually comes in different versions:
- standard
  * a standard project (not `npm`)
  * the PP library is included as a bundle file
- npm
  * an `npm` version of the same project
  * the PP library is included as an `npm` package
  * u need to run `npm install` in the project folder in order to install the dependencies
- npm unbundled
  * an `npm` version of the same project
  * the PP library is not included as an `npm` package, but as files in the project
  * can be useful if u plan to edit the PP library to adjust them to your need
  * u need to run `npm install` in the project folder in order to install the dependencies

## PPlayground

[Playground Folder Link](https://github.com/SignorPipo/wle_pplaygrounds/tree/main/wle_pplaygrounds/wle_pplayground)

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
  * [`wle_pplayground_npm_unbundled`](https://github.com/SignorPipo/wle_pplaygrounds/releases/latest/download/wle_pplayground.zip)

You can also download this template through `npm`: 
  * [`npm install wle_pplayground_npm_unbundled`](https://www.npmjs.com/package/wle_pplayground_npm_unbundled)

