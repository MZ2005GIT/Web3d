import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth, h= innerHeight;
const fov = 100, aspect = w/h, near=0.1, far=100;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

camera.position.set(0, 15, 30);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( w, h);
document.body.appendChild( renderer.domElement );

const controls  = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.003;

const textureLoader = new THREE.TextureLoader();

const sunLight = new THREE.PointLight(
    0xffffff,
    200,
    0
);

scene.add(sunLight);

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);

const sunTexture = textureLoader.load(
    './2k_sun.jpg'
);

sunTexture.colorSpace = THREE.SRGBColorSpace;

const sunMat = new THREE.MeshBasicMaterial({
    map: sunTexture
});

const sun = new THREE.Mesh(
    sunGeometry,
    sunMat
);

scene.add(sun);

const mercuryGeo = new THREE.SphereGeometry(0.3, 32, 32);

const mercuryTexture = textureLoader.load(
    './2k_mercury.jpg'
);

mercuryTexture.colorSpace = THREE.SRGBColorSpace;

const mercuryMat = new THREE.MeshStandardMaterial({
    map: mercuryTexture
});

const mercury = new THREE.Mesh(
    mercuryGeo,
    mercuryMat
);

mercury.position.x = 3;

scene.add(mercury);

const venusGeo = new THREE.SphereGeometry(0.5, 32, 32);

const venusTexture = textureLoader.load(
    './2k_venus.jpg'
);

venusTexture.colorSpace = THREE.SRGBColorSpace;

const venusMat = new THREE.MeshStandardMaterial({
    map: venusTexture
});

const venus = new THREE.Mesh(
    venusGeo,
    venusMat
);

venus.position.x = 4.5;

scene.add(venus);

const earthGeo = new THREE.SphereGeometry(0.55, 32, 32);

const earthTexture = textureLoader.load(
    './2k_earth.jpg'
);

earthTexture.colorSpace = THREE.SRGBColorSpace;

const earthMat = new THREE.MeshStandardMaterial({
    map: earthTexture
});

const earth = new THREE.Mesh(
    earthGeo,
    earthMat
);

earth.position.x = 7;

scene.add(earth);

const marsGeo = new THREE.SphereGeometry(0.4, 32, 32);

const marsTexture = textureLoader.load(
    './2k_mars.jpg'
);

marsTexture.colorSpace = THREE.SRGBColorSpace;

const marsMat = new THREE.MeshStandardMaterial({
    map: marsTexture
});

const mars = new THREE.Mesh(
    marsGeo,
    marsMat
);

mars.position.x = 10;

scene.add(mars);

const jupiterGeo = new THREE.SphereGeometry(1.1, 32, 32);

const jupiterTexture = textureLoader.load(
    './2k_jupiter.jpg'
);

jupiterTexture.colorSpace = THREE.SRGBColorSpace;

const jupiterMat = new THREE.MeshStandardMaterial({
    map: jupiterTexture
});

const jupiter = new THREE.Mesh(
    jupiterGeo,
    jupiterMat
);

jupiter.position.x = 13;

scene.add(jupiter);

const saturnGeo = new THREE.SphereGeometry(0.9, 32, 32);

const saturnTexture = textureLoader.load(
    './2k_saturn.jpg'
);

saturnTexture.colorSpace = THREE.SRGBColorSpace;

const saturnMat = new THREE.MeshStandardMaterial({
    map: saturnTexture
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

const saturnRingTexture = textureLoader.load(
    './2k_saturn_ring_alpha.jpg'
);

saturnRingTexture.colorSpace = THREE.SRGBColorSpace;

const ringMat = new THREE.MeshStandardMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide
});

const rings = new THREE.Mesh(
    ringGeo,
    ringMat
);

rings.rotation.x = Math.PI / 2;

saturn.add(rings);

const uranusGeo = new THREE.SphereGeometry(0.7, 32, 32);

const uranusTexture = textureLoader.load(
    './2k_uranus.jpg'
);

uranusTexture.colorSpace = THREE.SRGBColorSpace;

const uranusMat = new THREE.MeshStandardMaterial({
    map: uranusTexture
});

const uranus = new THREE.Mesh(
    uranusGeo,
    uranusMat
);

uranus.position.x = 21;

scene.add(uranus);

const neptuneGeo = new THREE.SphereGeometry(0.7, 32, 32);

const neptuneTexture = textureLoader.load(
    './2k_neptune.jpg'
);

neptuneTexture.colorSpace = THREE.SRGBColorSpace;

const neptuneMat = new THREE.MeshStandardMaterial({
    map: neptuneTexture
});

const neptune = new THREE.Mesh(
    neptuneGeo,
    neptuneMat
);

neptune.position.x = 25;

scene.add(neptune);

const spaceTexture = textureLoader.load(
    './2k_stars.jpg'
);

spaceTexture.colorSpace = THREE.SRGBColorSpace;

scene.background = spaceTexture;

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambientLight);

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