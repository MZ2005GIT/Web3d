import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// 1. MAIN SCENE AND CAMERA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080818);

const camera = new THREE.PerspectiveCamera(
60, window.innerWidth / window.innerHeight, 0.1, 100
);
camera.position.set(0, 3, 15);
camera.lookAt(0, 1.5, 0);

// 2. RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls  = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.003;

function createPlatform(x, y, z, width, height, depth, color) {

    const geometry = new THREE.BoxGeometry(
        width,
        height,
        depth
    );

    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.7,
        roughness: 0.4
    });

    const platform = new THREE.Mesh(geometry, material);

    platform.position.set(x, y, z);

    platform.castShadow = true;
    platform.receiveShadow = true;

    return platform;
}

function createTower(x, z, height, width, color) {

    const geometry = new THREE.BoxGeometry(
        width,
        height,
        width
    );

    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.3
    });

    const tower = new THREE.Mesh(geometry, material);

    tower.position.set(x, height / 2, z);

    tower.castShadow = true;

    return tower;
}

function createEnemy()
{
    const enemy = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.9, 0.4);

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    body.position.y = 0.9;

    enemy.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.35, 8, 6);

    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcc99
    });

    const head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.set(0, 1.55, 0);

    enemy.add(head);

    // Arms
    const armGeometry = new THREE.BoxGeometry(0.2, 0.65, 0.2);

    const armMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcc99
    });


    // Right leg
    const rightLeg = new THREE.Mesh(armGeometry, armMaterial);

    rightLeg.position.set(0.35, 0.25, 0.1);
    rightLeg.rotation.z = 0.3;

    enemy.add(rightLeg);

    // Left leg
    const leftLeg = new THREE.Mesh(armGeometry, armMaterial);

    leftLeg.position.set(-0.35, 0.25, 0.1);
    leftLeg.rotation.z = -0.3;

    enemy.add(leftLeg);

    // Left arm
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);

    leftArm.position.set(-0.55, 0.95, 0.1);
    leftArm.rotation.z = -0.5;

    enemy.add(leftArm);

    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);

    rightArm.position.set(0.55, 0.95, 0.1);
    rightArm.rotation.z = 0.5;

    enemy.add(rightArm);

    return enemy;
}

// 3. MAIN SCENE LIGHTING
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const mainLight = new THREE.DirectionalLight(0xffffff, 2);
mainLight.position.set(3, 5, 5);
scene.add(mainLight);

const groundGeometry = new THREE.BoxGeometry(
    50, 0.5, 50
);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x102f30,
    metalness: 0.7,
    roughness: 0.5
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.position.y = -0.25;

ground.receiveShadow = true;

// Add the environment to the main scene
scene.add(ground);

// Directional lighting
const directional = new THREE.DirectionalLight(
    0xffffff,
    2
);

directional.position.set(10, 20, 10);
directional.castShadow = true;

scene.add(directional);

scene.add(createPlatform(12, 0.5, 0, 4, 0.5, 4, 0x263b59));

scene.add(createPlatform(-7, 0.5, 5, 5, 0.5, 5, 0x263b59));

scene.add(createPlatform(0, 0.5, -6, 5, 0.5, 5, 0x263b59));

scene.add(createPlatform(8, 0.5, -3, 4, 0.5, 4, 0x263b59));

scene.add(createPlatform(-12, 0.5, 6, 3, 0.5, 3, 0x263b59));

scene.add(createPlatform(-5, 0.5, -7, 4, 0.5, 4, 0x263b59));

scene.add(createTower(-10, -10, 8, 2, 0x263b59));

scene.add(createTower(10, -10, 12, 2, 0x263b59));

scene.add(createTower(-10, 10, 8, 2, 0x263b59));

scene.add(createTower(10, 10, 12, 2, 0x263b59));

// Cyan light near the centre
const cyanLight = new THREE.PointLight(
    0x00d9ff,
    30,
    30
);

cyanLight.position.set(0, 10, 0);

scene.add(cyanLight);

// 5. PORTAL FRAME
const frameMaterial = new THREE.MeshStandardMaterial({
color: 0x00ccff,
emissive: 0x0077ff,
emissiveIntensity: 2,
metalness: 0.6,
roughness: 0.25
});

function createFramePart(width, height, x, y, z) {
const part = new THREE.Mesh(
new THREE.BoxGeometry(width, height, 0.25),
frameMaterial
);
part.position.set(x, y, z);
scene.add(part);
return part;
}

createFramePart(0.15, 3.4, -1.4, 1.8, 0);
createFramePart(0.15, 3.4, 1.4, 1.8, 0);
createFramePart(2.9, 0.15, 0, 3.5, 0);
createFramePart(2.9, 0.15, 0, 0.1, 0);

// 6. SECOND SCENE: THE WORLD INSIDE THE PORTAL
const portalScene = new THREE.Scene();

portalScene.background = scene.background.clone();

const enemy = createEnemy();

portalScene.add(enemy);

enemy.position.y = 1;

enemy.position.z = 6;

portalScene.add(createPlatform(0, 0, 6, 3, 0.5, 3));

portalScene.add(createTower(3, 0, 5, 2));

portalScene.add(createTower(-3, 0, 5, 2));

const portalCamera = new THREE.PerspectiveCamera(
    60,
    2.65 / 3.1,
    0.1,
    100
);

portalCamera.position.copy(camera.position);
portalCamera.quaternion.copy(camera.quaternion);
portalCamera.rotateX = 1.5;

portalScene.add(new THREE.AmbientLight(0xffffff, 1.5));

// 7. OBJECTS INSIDE THE PORTAL

// 8. OFF-SCREEN TEXTURE FOR THE PORTAL VIEW
// Its aspect ratio matches the portal plane.
const portalTexture = new THREE.WebGLRenderTarget(800, 936, {
minFilter: THREE.LinearFilter,
magFilter: THREE.LinearFilter,
format: THREE.RGBAFormat,
depthBuffer: true
});

// 9. SHADER: SHOW THE TEXTURE, ADD MOVING COLOUR AND FADE EDGES
const portalMaterial = new THREE.ShaderMaterial({
uniforms: {
tPortal: { value: portalTexture.texture },
uTime: { value: 0 }
},

vertexShader: `
varying vec2 vUv;

void main() {
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,

fragmentShader: `
uniform sampler2D tPortal;
varying vec2 vUv;

void main() {
vec4 portalColor = texture2D(tPortal, vUv);

vec3 glow = vec3(0.05, 0.2, 0.8);
vec3 finalColor = portalColor.rgb
+ glow * 0.05;

float edge = min(
min(vUv.x, 1.0 - vUv.x),
min(vUv.y, 1.0 - vUv.y)
);
float alpha = smoothstep(0.0, 0.1, edge);

gl_FragColor = vec4(finalColor, alpha);

#include <tonemapping_fragment>
#include <colorspace_fragment>
}
`,
transparent: true,
depthWrite: false,
side: THREE.DoubleSide
});

// 10. PORTAL PLANE
const portalPlane = new THREE.Mesh(
new THREE.PlaneGeometry(2.65, 3.1),
portalMaterial
);
portalPlane.position.set(0, 1.8, 0.14);
scene.add(portalPlane);

// 11. ANIMATION AND RENDER ORDER
const clock = new THREE.Clock();

function animate() {
requestAnimationFrame(animate);

const elapsed = clock.getElapsedTime();

portalMaterial.uniforms.uTime.value = elapsed;

controls.update();

// Render the portal scene to its texture first.
renderer.setRenderTarget(portalTexture);
renderer.clear();
renderer.render(portalScene, portalCamera);

// Then render the main scene to the browser.
renderer.setRenderTarget(null);
renderer.render(scene, camera);
}
animate();

// 12. RESIZE THE MAIN CAMERA AND RENDERER
window.addEventListener('resize', () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});