import React, { useEffect } from "react";
import { FreeCamera, Vector3, HemisphericLight, SceneLoader } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import "./App.css";
import "@babylonjs/loaders/OBJ/objFileLoader";
import "@babylonjs/loaders";
import * as BABYLON from '@babylonjs/core';

let skeleton;
let move;
let exportscene;

const onSceneReady = async (scene, props) => {
  BABYLON.Animation.AllowMatricesInterpolation = true;

  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(-5, 0, 0), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
  light.intensity = 0.7;

  // Load the auditorium scene
  await SceneLoader.ImportMeshAsync("", "Scene/", "Auditorium.glb").then((result) => {
    result.meshes[0].scaling = new Vector3(1, 1, 1);
  });

  // Load the character mesh and skeleton once
  let characterTemplate0, characterTemplate1;
  await SceneLoader.ImportMeshAsync("", "Characters/", "character2.babylon").then((result) => {
    characterTemplate0 = result.meshes[0]; // Use the first mesh as a template
    characterTemplate1 = result.meshes[1]; // Use the first mesh as a template
    skeleton = result.skeletons[0]; // Use one skeleton for all characters

    // After creating all the instances/clones
    // characterTemplate.dispose(); // Remove the original mesh from the scene and free memory

    // Initialize characters with independent transforms but shared skeleton
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 7 + i; j++) {
        // Clone the mesh for each character
        let clone0_center = characterTemplate0.clone(`characterClone0_center_${i}_${j}`);
        let clone1_center = characterTemplate1.clone(`characterClone1_center_${i}_${j}`);
        let clone0_left = characterTemplate0.clone(`characterClone0_left_${i}_${j}`);
        let clone1_left = characterTemplate1.clone(`characterClone1_left_${i}_${j}`);
        let clone0_right = characterTemplate0.clone(`characterClone0_right_${i}_${j}`);
        let clone1_right = characterTemplate1.clone(`characterClone1_right_${i}_${j}`);
        
        // Set scaling, position, and rotation for each clone
        let scalingStart = new Vector3(0.01, 0.01, 0.01);
        let positionStart = new Vector3(7, -3, 3);
        let positionAdd = new Vector3(i, i / 2, i / 2 - j);
        
        // let positionAdd_left = new Vector3(
        //   positionAdd._x * Math.sqrt(3)/2 - positionAdd._y * 0.5, 
        //   positionAdd._x * 0.5 + positionAdd._y * Math.sqrt(3)/2,
        //   positionAdd._z);
        let positionAdd_left = new Vector3(
          positionAdd._x * Math.sqrt(3)/2 - positionAdd._z * 0.5, 
          positionAdd._y,
          positionAdd._x * 0.5 + positionAdd._z * Math.sqrt(3)/2,
          // positionAdd._y
        );
        let positionAdd_right = new Vector3(
          positionAdd._x * Math.sqrt(3)/2 + positionAdd._z * 0.5, 
          positionAdd._y,
          - positionAdd._x * 0.5 + positionAdd._z * Math.sqrt(3)/2,
          // positionAdd._y
        );
        let leftPosOffset = new Vector3(-2.0869- -6.6513, 0, -14.679- -3.2665);
        let rightPosOffset = new Vector3(-5.1534- -6.6513, 0, 9.0213- -3.2665);

        clone0_center.scaling = scalingStart;
        clone0_center.position = positionStart.add(positionAdd);
        clone0_center.rotation = new Vector3(-1.5, 1.5, 0);

        clone1_center.scaling = scalingStart;
        clone1_center.position = positionStart.add(positionAdd);
        clone1_center.rotation = new Vector3(-1.5, 1.5, 0);

        clone0_left.scaling = scalingStart;
        clone0_left.position = positionStart.add(positionAdd_left).subtract(leftPosOffset);
        clone0_left.rotation = new Vector3(-1.5, 1.5, -Math.PI/6);

        clone1_left.scaling = scalingStart;
        clone1_left.position = positionStart.add(positionAdd_left).subtract(leftPosOffset);
        clone1_left.rotation = new Vector3(-1.5, 1.5, -Math.PI/6);

        clone0_right.scaling = scalingStart;
        clone0_right.position = positionStart.add(positionAdd_right).subtract(rightPosOffset);
        clone0_right.rotation = new Vector3(-1.5, 1.5, Math.PI/6);

        clone1_right.scaling = scalingStart;
        clone1_right.position = positionStart.add(positionAdd_right).subtract(rightPosOffset);
        clone1_right.rotation = new Vector3(-1.5, 1.5, Math.PI/6);

        // Bind the clone to the shared skeleton
        clone0_center.skeleton = skeleton;
        clone1_center.skeleton = skeleton;
        clone0_left.skeleton = skeleton;
        clone1_left.skeleton = skeleton;
      }
    }

    characterTemplate0.dispose();
    characterTemplate1.dispose();

    // Start animation on the shared skeleton
    const idleRange = skeleton.getAnimationRange(move);
    scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
  });
};

/**
 * Will run on every frame render.
 */
const onRender = async (scene) => {
  // No need to animate multiple skeletons since we are using one shared skeleton
};

export default (props) => (
  move = props.data,
  exportscene = props.scene,
  useEffect(() => {
    // Trigger animations for the shared skeleton
    if (skeleton !== undefined) {
      const idleRange = skeleton.getAnimationRange(move);
      exportscene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
    }
  }, [move, exportscene]),
  <div>
    <SceneComponent antialias props={props} onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" width="1500" height="700" />
  </div>
);
