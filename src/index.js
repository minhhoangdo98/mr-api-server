const BABYLON = require('@babylonjs/core');
const BABYLONGUI = require('@babylonjs/gui');
const api_reception = require('./api_server/api_reception');
const api_def = require('./api_server/api_definitions');

window.addEventListener('DOMContentLoaded', async function () {
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);

    async function createScene() {
        const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(3, 2, 10), scene);
        camera.attachControl(true);
        camera.rotation = new BABYLON.Vector3(0, Math.PI, 0);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        //moving box
        let box = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 1, size: 1 }, scene);
        box.position = new BABYLON.Vector3(0, 0, -10);
        let pointerDragBehavior = new BABYLON.PointerDragBehavior();
        box.addBehavior(pointerDragBehavior);
        box.material = new BABYLON.StandardMaterial("boxMat", scene);
        box.material.diffuseColor = new BABYLON.Color3(1, 0.529, 0);

        //player object
        let userObj = BABYLON.MeshBuilder.CreateCapsule("User", { height: 3, radius: 0.5 });
        userObj.position = new BABYLON.Vector3(0, 0, 0);
        let userEye = BABYLON.MeshBuilder.CreateBox("UserEye", { width: 1, height: 0.2, size: 1 });
        userEye.position = new BABYLON.Vector3(0, 1, -0.5);

        //ground
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 100, width: 100, subdivisions: 4 });
        ground.position = new BABYLON.Vector3(0, -1, 0);
        ground.material = new BABYLON.StandardMaterial("boxMat", scene);
        ground.material.diffuseColor = new BABYLON.Color3(0.271, 0.271, 0.067);

        //button
        let plane = BABYLON.MeshBuilder.CreatePlane("plane");
        plane.position.y = 2;

        plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        let advancedTexture = BABYLONGUI.AdvancedDynamicTexture.CreateForMesh(plane);

        let button1 = BABYLONGUI.Button.CreateSimpleButton("but1", "Sync");
        button1.width = 1;
        button1.height = 0.4;
        button1.color = "white";
        button1.fontSize = 200;
        button1.background = "green";
        button1.onPointerUpObservable.add(async function () {
            await api_reception.storeData(api_def.api_dict.SaveTestData.url, {}, JSON.stringify({
                x: box.position.x,
                y: box.position.y,
                z: box.position.z
            }));
        });
        advancedTexture.addControl(button1);

        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: scene,
            disableTeleportation: true
        });
        const featureManager = xr.baseExperience.featuresManager;
        const movementFeature = featureManager.enableFeature(BABYLON.WebXRFeatureName.MOVEMENT, 'latest', {
            xrInput: xr.input,
            movementOrientationFollowsViewerPose: true,
            movementSpeed: 1
        });
    }

    function startRenderLoop() {
        engine.runRenderLoop(function () {
            scene.render();
        });
    }

    await createScene();

    startRenderLoop(engine, canvas);

    window.addEventListener("resize", function () {
        engine.resize();
    });
})