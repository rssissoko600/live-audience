import React, {useEffect} from "react";
import { ArcRotateCamera, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, appendSceneAsync, loadSceneAsync } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

import "@babylonjs/loaders/OBJ/objFileLoader";
import "@babylonjs/loaders";

let skeletons = [];
let move;
let exportscene;

const onSceneReady = async (scene, props) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(-5, 0, 0), scene);

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
    result.meshes[0].scaling = new Vector3(1, 1, 1);
  });

  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 7 + i; j++) {
      await SceneLoader.ImportMeshAsync("", "Characters/", "character2.babylon").then((result) => {
        var skeleton = result.skeletons[0];
        skeletons.push(result);
        result.meshes[0].scaling = new Vector3(0.01, 0.01, 0.01);
        result.meshes[0].position = new Vector3(7 + i, -3 + i/2, 3 + i/2 - j);  
        result.meshes[0].rotation = new Vector3(-1.5, 1.5, 0); 
        
        result.meshes[1].scaling = new Vector3(0.01, 0.01, 0.01);
        result.meshes[1].position = new Vector3(7 + i, -3 + i/2, 3 + i/2 - j);  
        result.meshes[1].rotation = new Vector3(-1.5, 1.5, 0); 

        var idleRange = skeleton.getAnimationRange(move);
        scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
        });
    }
  }
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = async (scene) => {
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    
  //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }

  if(skeletons !== undefined) {
    // console.log(skeletons)
    // skeletons.forEach((skeleton) => {
    //   var idleRange = skeleton.getAnimationRange(move);
    //   scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
    // });
  }
};

export default (props) => (
  move = props.data,
  exportscene = props.scene,
  useEffect(() => { 
    if(skeletons !== undefined) {
      skeletons.forEach(skel => {
        var skeleton = skel.skeletons[0];
        var idleRange = skeleton.getAnimationRange(move);
        exportscene.beginAnimation(skel, idleRange.from, idleRange.to, true);
      });
    }
  }, [move, exportscene]),
  <div>
    <SceneComponent antialias props={props} onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" width="1300" height="650" />
  </div>
);