const BABYLON = require('babylonjs');

let canvas = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = new BABYLON.Scene(engine);

function createScene() {
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
    camera.attachControl(true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    let pointerDragBehavior = new BABYLON.PointerDragBehavior();
    sphere.addBehavior(pointerDragBehavior);
}

function startRenderLoop() {
    engine.runRenderLoop(function () {
        scene.render();
    });
}

createScene();

startRenderLoop(engine, canvas);

window.addEventListener("resize", function () {
    engine.resize();
});