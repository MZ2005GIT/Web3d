import * as THREE from "three";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

const camera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.set(0,10,10);

camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({antialias : true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

directionalLight.position.set(5, 10, 5);

scene.add(directionalLight);

const groundGeometry = new THREE.BoxGeometry(12, 0.5, 10);

const groundMaterial = new THREE.MeshStandardMaterial({color: 0x228b22});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);

ground.position.y = -0.25;

scene.add(ground);

const PlayerGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);

const PlayerMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});

const Player = new THREE.Mesh(PlayerGeometry, PlayerMaterial);

Player.position.set(0, 0.4, 3);

scene.add(Player);

const coins = [];

function createCoin(x, z) {

    const coinGeometry = new THREE.SphereGeometry(1, 32, 16);

    coinGeometry.scale(1, 0.1, 1);

    const coinMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});

    const coin = new THREE.Mesh(coinGeometry, coinMaterial);

    coin.position.set(x, 0.5, z);

    coin.rotation.x = Math.PI / 2;

    scene.add(coin);

    coins.push(coin);
}

createCoin(-4, -2);
createCoin(-2, 0);
createCoin(2, -2);
createCoin(4, 1);

const keys = {};

window.addEventListener(
    "keydown",
    function(event)
    {
        keys[event.key.toLowerCase()] = true;
    }
);

window.addEventListener(
    "keyup",
    function(event)
    {
        keys[event.key.toLowerCase()] = false;
    }
);

function movePlayer(deltaTime)
{
    const speed = 4.2;

    if (keys["w"])
    {
        Player.position.z -= speed * deltaTime;
    }

    if (keys["s"])
    {
        Player.position.z += speed * deltaTime;
    }

    if (keys["a"])
    {
        Player.position.x -= speed * deltaTime;
    }

    if (keys["d"])
    {
        Player.position.x += speed * deltaTime;
    }

    Player.position.x = THREE.MathUtils.clamp(Player.position.x, -5.5, 5.5);

    Player.position.z = THREE.MathUtils.clamp(Player.position.z, -4.5, 4.5);
}

let score = 0;

function checkCoins() {

    let count = 0;
    while (count < coins.length) {
        const coin = coins[count];

        const distance = Player.position.distanceTo(coin.position);

        if (distance < 0.8) {
            scene.remove(coin);
            coins.splice(count, 1);
            score++;
            document.getElementById("score").innerText = "coins: " + score;

            if (score === 4)
            {
                document.getElementById(
                    "message"
                ).innerText =
                    "YOU COLLECTED ALL COINS";
            }
        } else {
            count++;
        }
    }
}

function animateCoins(deltaTime)
{
    for (let i = 0; i < coins.length; i++)
    {
        const coin = coins[i];

        coin.rotation.z += 3 * deltaTime;

        coin.position.y = 0.5 + Math.sin(Date.now() * 0.003 + i) * 0.2;
    }
}

let previousTime;

function animate(currentTime)
{
    requestAnimationFrame(animate);

    if (previousTime === undefined)
    {
        previousTime = currentTime;
    }

    const deltaTime = (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    movePlayer(deltaTime);

    checkCoins();

    animateCoins(deltaTime);

    renderer.render(scene, camera);
}

animate(performance.now());