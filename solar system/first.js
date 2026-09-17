import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth, h= innerHeight;
const fov = 100, aspect = w/h, near=0.1, far=100;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

camera.position.set(0, 10, 10);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( w, h);
document.body.appendChild( renderer.domElement );

const controls  = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingfactor = 0.003;

const textureLoader = new THREE.TextureLoader();

const sunLight = new THREE.PointLight(
    0xffffff,
    200,
    0
);

scene.add(sunLight);

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});

const sun = new THREE.Mesh(
    sunGeometry,
    sunMaterial
);

scene.add(sun);

const mercuryGeo = new THREE.SphereGeometry(0.3, 32, 32);

const mercuryMat = new THREE.MeshStandardMaterial({
    color: 0x888888
});

const mercury = new THREE.Mesh(
    mercuryGeo,
    mercuryMat
);

mercury.position.x = 3;

scene.add(mercury);

const venusGeo = new THREE.SphereGeometry(0.5, 32, 32);

const venusMat = new THREE.MeshStandardMaterial({
    color: 0xffaa55
});

const venus = new THREE.Mesh(
    venusGeo,
    venusMat
);

venus.position.x = 4.5;

scene.add(venus);

const earthGeo = new THREE.SphereGeometry(0.55, 32, 32);

const earthMat = new THREE.MeshStandardMaterial({
    color: 0x2266ff
});

const earth = new THREE.Mesh(
    earthGeo,
    earthMat
);

earth.position.x = 7;

scene.add(earth);

const marsGeo = new THREE.SphereGeometry(0.4, 32, 32);

const marsMat = new THREE.MeshStandardMaterial({
    color: 0xff3300
});

const mars = new THREE.Mesh(
    marsGeo,
    marsMat
);

mars.position.x = 10;

scene.add(mars);

const jupiterGeo = new THREE.SphereGeometry(1.1, 32, 32);

const jupiterMat = new THREE.MeshStandardMaterial({
    color: 0xcc8844
});

const jupiter = new THREE.Mesh(
    jupiterGeo,
    jupiterMat
);

jupiter.position.x = 13;

scene.add(jupiter);

const saturnGeo = new THREE.SphereGeometry(0.9, 32, 32);

const saturnMat = new THREE.MeshStandardMaterial({
    color: 0xddbb77
});

const saturn = new THREE.Mesh(
    saturnGeo,
    saturnMat
);

saturn.position.x = 17;

scene.add(saturn);

const ringGeo = new THREE.RingGeometry(
    1.2,
    1.8,
    64
);

const ringMat = new THREE.MeshBasicMaterial({
    color: 0xc8b78b,
    side: THREE.DoubleSide
});

const rings = new THREE.Mesh(
    ringGeo,
    ringMat
);

rings.rotation.x = Math.PI / 2;

saturn.add(rings);

const uranusGeo = new THREE.SphereGeometry(0.7, 32, 32);

const uranusMat = new THREE.MeshStandardMaterial({
    color: 0x66dddd
});

const uranus = new THREE.Mesh(
    uranusGeo,
    uranusMat
);

uranus.position.x = 21;

scene.add(uranus);

const neptuneGeo = new THREE.SphereGeometry(0.7, 32, 32);

const neptuneMat = new THREE.MeshStandardMaterial({
    color: 0x3355ff
});

const neptune = new THREE.Mesh(
    neptuneGeo,
    neptuneMat
);

neptune.position.x = 25;

scene.add(neptune);

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



















function createPlanet(
    size,
    color,
    distance,
    speed
) {

    const geometry = new THREE.SphereGeometry(
        size,
        32,
        32
    );

    const material = new THREE.MeshStandardMaterial({
        color: color
    });

    const planet = new THREE.Mesh(
        geometry,
        material
    );

    const orbit = new THREE.Group();

    scene.add(orbit);

    orbit.add(planet);

    planet.position.x = distance;

    orbit.userData.speed = speed;

    return orbit;
}