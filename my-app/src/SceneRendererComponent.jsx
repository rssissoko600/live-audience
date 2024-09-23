import React from "react";
import { ArcRotateCamera, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, appendSceneAsync, loadSceneAsync } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

import "@babylonjs/loaders/OBJ/objFileLoader";
import "@babylonjs/loaders";

let box;
let rpm;
let audi;

const onSceneReady = async (scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(-15, 15, 0), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  await SceneLoader.ImportMeshAsync("", "Scene/", "Auditorium.obj").then((result) => {
    console.log(result);
    result.meshes[0].scaling = new Vector3(1, 1, 1);

  });

  await SceneLoader.ImportMeshAsync("", "Characters/", "character.glb").then((result) => {
    console.log(result);
    result.meshes[0].scaling = new Vector3(5, 5, 5);
  });
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = async (scene) => {
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    
  //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }

  // console.log(audi.meshes);

};

export default (props) => (
  rpm = props.data,
  <div>
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" width="750" height="500" />
  </div>
);