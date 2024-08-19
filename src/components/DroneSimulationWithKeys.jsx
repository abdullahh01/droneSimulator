import { useEffect, useRef } from 'react';
import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/DRACOLoader.js";
// import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/RGBELoader.js";
import { Sky } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/objects/Sky.js";
import * as CANNON from 'cannon';

const DroneSimulationWithKeys = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      location.pathname = "/signup";
    }
    // Basic setup
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    let mixer;
    // Setup Sky
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);
    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 5;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.5;

    const sun = new THREE.Vector3();
    function updateSunPosition() {
      const theta = Math.PI * (0.45 - 0.5);
      const phi = 2 * Math.PI * (0.25 - 0.5);
      sun.x = Math.cos(phi);
      sun.y = Math.sin(phi) * Math.sin(theta);
      sun.z = Math.sin(phi) * Math.cos(theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);
    }
    updateSunPosition();
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('../../static/models/cloud_layers_2k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
    });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'));
    
    // Setup Physics World
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    // Ground physics body
  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({ mass: 0 }); // Static ground
  groundBody.addShape(groundShape);
  groundBody.position.set(0, 0.5, 0);
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);

  // add texture
  var texture = new THREE.TextureLoader().load("../../static/models/ground.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.castShadow = false;
  texture.repeat.set(5, 5);

  // Create ground material
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.8,
    metalness: 0.2,
  });

  // Create ground mesh
  const groundGeometry = new THREE.PlaneGeometry(3000, 3000); // Adjust size as needed
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2; // Rotate to make it flat
  scene.add(groundMesh);

    // Load Drone model
    const droneShape = new CANNON.Box(new CANNON.Vec3(3, 0.35, 3));
    const droneBody = new CANNON.Body({
      mass: 1, // Set the mass to 5, which represents the weight of the drone
      position: new CANNON.Vec3(0, 0, 0),
      shape: droneShape,
    });
    world.addBody(droneBody);

    
    let drone = null;
    loader.load('../../static/models/Drone.glb', (gltf) => {
      drone = gltf.scene;
      drone.position.set(0, 0, 0);
      drone.scale.set(10, 10, 10);
      drone.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set("#ffffff");
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(drone);
      mixer = new THREE.AnimationMixer(drone);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    });

function scale(value, inMin, inMid, inMax, outMin, outMid, outMax) {
  if (value <= inMid) {
    return ((value - inMin) * (outMid - outMin)) / (inMid - inMin) + outMin;
  } else {
    return ((value - inMid) * (outMax - outMid)) / (inMax - inMid) + outMid;
  }
}
var scan;
var scanBody; // Static object (mass = 0)
var scanShape;
for (let index = 0; index < 5; index++) {
  loader.load(
    "../../static/models/tree/scene.gltf",
    function (gltf) {
        scan = gltf.scene;
        scan.position.set(-(index+(Math.floor(Math.random() * (1000 - 1 + 1)) + 10)), 0, 20+index+(Math.floor(Math.random() * (1000 - 1 + 1)) + 10));
        scan.rotation.y = Math.PI / 2;
        scan.scale.set(4, 4, 4);
        scene.add(scan);
    
        // Add physics for the first object
        scanBody = new CANNON.Body({ mass: 0 });
        scanShape = new CANNON.Box(new CANNON.Vec3(6, 37, 6)); // Adjust the size as needed
        scanBody.addShape(scanShape);
        scanBody.position.copy(scan.position);
        world.addBody(scanBody);
    
        // Create Three.js mesh for the CANNON.js shape
        // const boxGeometry = new THREE.BoxGeometry(6, 71, 6); // Match CANNON.Box size
        // const boxMaterial = new THREE.MeshBasicMaterial({ color: "lightgreen", wireframe: true });
        // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        // boxMesh.position.copy(scan.position);
        // scene.add(boxMesh);
    
        // Change the color of specific parts of the object
      scan.traverse(function (child) {
        if (child.isMesh) {
          if (child.name === "Object_2") { // Replace with the actual name of the part
            child.material.color.setHex(0x00ff00); // Change to the desired color (green in this case)
          } 
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  )
}
    const ambientLight = new THREE.AmbientLight(0x888888, 1); // Base light for all objects
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); // Simulates sunlight
    directionalLight.position.set(10, 20, 10); // Position the light
    directionalLight.castShadow = true; // Enable shadow casting
    scene.add(directionalLight);


    scene.background = new THREE.Color(0xffffff);
    // scene.fog = new THREE.Fog(0xccbdc5, 30, 120);

    camera.position.set(0, 5, -10);
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    // Keyboard controls
    const keyboard = {
      pitchForward: false,
      pitchBackward: false,
      rollLeft: false,
      rollRight: false,
      yawLeft: false,
      yawRight: false,
      throttleUp: false,
      throttleDown: false,
    };

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          keyboard.pitchBackward = true;
          break;
          case 'ArrowDown':
          keyboard.pitchForward = true;
          break;
        case 'ArrowLeft':
          keyboard.rollLeft = true;
          break;
        case 'ArrowRight':
          keyboard.rollRight = true;
          break;
        case 'a':
          keyboard.yawLeft = true;
          break;
        case 'd':
          keyboard.yawRight = true;
          break;
        case 'w':
          keyboard.throttleUp = true;
          break;
        case 's':
          keyboard.throttleDown = true;
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          keyboard.pitchBackward = false;
          break;
          case 'ArrowDown':
          keyboard.pitchForward = false;
          break;
        case 'ArrowLeft':
          keyboard.rollLeft = false;
          break;
        case 'ArrowRight':
          keyboard.rollRight = false;
          break;
        case 'a':
          keyboard.yawLeft = false;
          break;
        case 'd':
          keyboard.yawRight = false;
          break;
        case 'w':
          keyboard.throttleUp = false;
          break;
        case 's':
          keyboard.throttleDown = false;
          break;
        default:
          break;
      }
    });

  var cameraoffset = new THREE.Vector3(6, 10, -10);
  var cameraLerpFactor = 0.05; // control the speed of interpolation (0.05 is a good starting value)

var droneCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
droneCamera.position.set(0, 2, -5); // Position the droneCamera at the back of the drone

var droneCameraTwo = droneCamera.clone();

var droneView = false; // By default, the view is set to the main camera
var bottomView = false; // View from the bottom of the drone
var fix_camera = false; // View from the bottom of the drone

window.addEventListener("keydown", function (event) {
  // If key pressed is 'C' or 'c'
  if (event.key === "C" || event.key === "c") {
    droneView = !droneView; // Toggle the drone view
    bottomView = false; // If drone view is active, bottom view must be deactivated
  }
  // If key pressed is 'M' or 'm'
  else if (event.key === "M" || event.key === "m") {
    bottomView = !bottomView; // Toggle the bottom view
    droneView = false; // If bottom view is active, drone view must be deactivated
  }
});

var droneCameracontrol = { pitch: 0, yaw: 0 }; // Control object to store pitch and yaw values

window.addEventListener("keydown", function (event) {
  if (event.key === "V" || event.key === "v") {
    // If drone view is active, update the droneCamera's rotation based on the control values
    if (droneView) {
      droneCamera.rotation.x += droneCameracontrol.pitch; // Rotate around the x-axis
      droneCamera.rotation.y += droneCameracontrol.yaw; // Rotate around the y-axis
    }
  }
});
  var last_yaw = 0;
  var camera_yaw = 0;
  var camera_pitch = 0;
  var desiredAltitude = 0;

// Enabling shadows
renderer.shadowMap.enabled = true;
// pointLight.castShadow = true;
// groundMesh.receiveShadow = true;

  const animate = () => {
    requestAnimationFrame(animate);
    // Rest of the animate code...
  
    var activeCamera;
    if (droneView) {
      activeCamera = droneCamera;
    } else if (bottomView) {
      activeCamera = droneCameraTwo;
    } else {
      activeCamera = camera;
    }
  
    if (drone) {
      // Update Physics World
      world.step(1 / 60);
      // Update drone position and rotation
      if (drone) {
        drone.position.copy(droneBody.position);
        drone.quaternion.copy(droneBody.quaternion);

        // Apply forces based on keyboard input
        if (keyboard.pitchForward) droneBody.applyLocalForce(new CANNON.Vec3(0, 0, -10), new CANNON.Vec3(0, 0, 0));
        if (keyboard.pitchBackward) droneBody.applyLocalForce(new CANNON.Vec3(0, 0, 11), new CANNON.Vec3(0, 0, 0));
        if (keyboard.rollRight) droneBody.applyLocalForce(new CANNON.Vec3(-10, 0, 0), new CANNON.Vec3(0, 0, 0));
        if (keyboard.rollLeft) droneBody.applyLocalForce(new CANNON.Vec3(10, 0, 0), new CANNON.Vec3(0, 0, 0));
        if (keyboard.yawLeft){ 
          droneBody.angularVelocity.y += 0.09;     // Apply yaw left (clockwise rotation)
        } else if (keyboard.yawRight){
          droneBody.angularVelocity.y -= 0.09; // Apply yaw right (clockwise rotation)
        } else{
          droneBody.angularVelocity.y = 0;
        }
        if (keyboard.throttleUp) droneBody.applyLocalForce(new CANNON.Vec3(0, 20, 0), new CANNON.Vec3(0, 0, 0));
        if (keyboard.throttleDown) droneBody.applyLocalForce(new CANNON.Vec3(0, -10, 0), new CANNON.Vec3(0, 0, 0));
      }
  
      if (droneView) {
        droneCamera.position.copy(drone.position);

        // Adjust the camera to be in front of the drone
        var cameraOffset = new THREE.Vector3(0, 0.75, -5).applyQuaternion(drone.quaternion);

        droneCamera.position.add(cameraOffset);

        // Set the camera to look in the direction the drone is facing
        droneCamera.lookAt(drone.position.clone().add(new THREE.Vector3(0, 0, -1).applyQuaternion(drone.quaternion)));
      
      } else if (bottomView) {
        droneCameraTwo.position.copy(drone.position);
        droneCameraTwo.position.y -= 0.2;
        droneCameraTwo.position.z -= 0.2;
  
        var cameraEulerBomb = new THREE.Euler(0, 0, 0, "YXZ");
        var cameraQuaternionBomb = new THREE.Quaternion();
  
        camera_yaw = last_yaw + Math.PI;
        camera_pitch = -Math.PI / 2;
        cameraEulerBomb.set(camera_pitch, camera_yaw, 0);
        cameraQuaternionBomb.setFromEuler(cameraEulerBomb);
  
        droneCameraTwo.quaternion.copy(cameraQuaternionBomb);
      } else if (fix_camera) {
        camera.position.set(0, 5, -10);
        camera.lookAt(drone.position);
      } else {
        try {
          camera.lookAt(drone.position);
        } catch (error) {
          console.log("Error",error);
        }
      }
    }
  
    if (mixer) {
      mixer.update(scale(desiredAltitude, -1, 0, 1, 0, 0.5, 5));
    }
    
    if (drone && drone.position) {
      var targetPosition = new THREE.Vector3();
      targetPosition.copy(drone.position).add(cameraoffset);
      if (!droneView) {
        camera.position.lerp(targetPosition, cameraLerpFactor);
      }
      
    }
    // controls.update();
    renderer.render(scene, activeCamera);
  };

    animate();

    return () => {
      // mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh', position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "50px", }} />;
}

export default DroneSimulationWithKeys