import * as THREE from './three/three.module.js';

import { DeviceOrientationControls } from './three/DeviceOrientationControls.js';

let camera, scene, renderer, controls;

// on new question: rotate 30 degrees


let selectingEmoji = null;
let selectingStart = 0;
const selectionThreshold = Math.cos(20 * Math.PI / 180); // 20 degrees


// Create a function to generate emoji texture
function generateEmojiTexture(emoji) {
    const canvas = document.createElement('canvas');
    canvas.width = 256*1.2;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.font = '200px Arial';
    ctx.fillText(emoji, 48, 180);
    return new THREE.CanvasTexture(canvas);
}

// Define the positions and emojis
const positions = [];

// Generate random heights within the 30 to 150 degree range
const randomHeights = Array.from({ length: 4 }, () => 20 + Math.random() * 140);


init = function() {
    const overlay = document.getElementById('teamInfo');
    overlay.remove();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

    // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // if (isIOS) {
    //   camera.rotation.y -= Math.PI / 2;  // -90 degrees in radians
    // }

    controls = new DeviceOrientationControls( camera );

    scene = new THREE.Scene();

    const geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );

    const material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( '../img/scene.jpg' )
    } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    displayAnswers = function(answers) {
        positions.forEach(({ sprite, glowSprite, labelText }) => {
            scene.remove(sprite);
            scene.remove(glowSprite);
            if (labelText) {
                scene.remove(labelText);                
            }
        });          

        positions.length = 0;

        answers.forEach((answer, i) => {
            let emoji = answer.emoji;

            const angle = (45 + i * 90) * (Math.PI / 180); // 45-degree offset
            const heightAngle = randomHeights[i] * (Math.PI / 180);
        
            const x = 200 * Math.cos(angle) * Math.sin(heightAngle);
            const y = 200 * Math.cos(heightAngle);
            const z = 200 * Math.sin(angle) * Math.sin(heightAngle);
        
            // Create the 'glow' sprite
            const glowMaterial = new THREE.SpriteMaterial({ map: generateEmojiTexture(emoji), transparent: true, opacity: 0.2 });
            const glowSprite = new THREE.Sprite(glowMaterial);
            glowSprite.position.set(x, y, z);
            glowSprite.scale.set(150, 150, 1); // Slightly larger scale
            scene.add(glowSprite);
        
            // Create main sprite
            const material = new THREE.SpriteMaterial({ map: generateEmojiTexture(emoji) });
            const sprite = new THREE.Sprite(material);
            sprite.position.set(x, y, z);
            sprite.scale.set(100, 100, 1);
            scene.add(sprite);
        
            let label = answer.label ? answer.label : "";
            let labelText = null;
            if (label) {
                // Create a canvas for the label
                const labelCanvas = document.createElement('canvas');
                labelCanvas.width = 256;
                labelCanvas.height = 64;
                const labelCtx = labelCanvas.getContext('2d');
                labelCtx.font = '50px Arial';
                labelCtx.fillStyle = 'white';
                labelCtx.fillText(label, 10, 50);
        
                // Create sprite material using label canvas
                const labelTexture = new THREE.CanvasTexture(labelCanvas);
                const labelMaterial = new THREE.SpriteMaterial({ map: labelTexture });
                labelText = new THREE.Sprite(labelMaterial);
        
                // Position and scale label sprite
                labelText.position.set(x, y - 50, z);
                labelText.scale.set(100, 40, 1);
        
                // Add label sprite to the scene
                scene.add(labelText);
            }

            // Store both sprites along with their positions
            positions.push({ x, y, z, emoji, sprite, glowSprite, labelText });

        });
    }

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function animate() {
    window.requestAnimationFrame( animate );

    controls.update();
    renderer.render( scene, camera );

    // EMOJI SELECTION
    const cameraDir = camera.getWorldDirection(new THREE.Vector3());

    let closestEmoji = null;
    let maxCosine = -1;
    let closestEmojiChar = null;

    
    for (const { x, y, z, sprite, emoji } of positions) {
        const emojiPos = new THREE.Vector3(x, y, z).normalize();
        const cosine = cameraDir.dot(emojiPos);

        if (cosine > maxCosine) {
            maxCosine = cosine;
            closestEmoji = sprite;
            closestEmojiChar = emoji;
        }
    }

    if (maxCosine > selectionThreshold) {

        // Initialize original and target sizes
        const originalSize = new THREE.Vector3(100, 100, 1);
        const targetSize = new THREE.Vector3(150, 150, 1);

        if (selectingEmoji === closestEmoji) {
            // clamped between 0 and 1
            const focusFraction = Math.min((Date.now() - selectingStart) / 3000, 1);

            // Interpolate size
            const newSize = originalSize.clone().lerp(targetSize, focusFraction);
            closestEmoji.scale.set(newSize.x, newSize.y, newSize.z);

            if (focusFraction === 1) {
                // TODO: do something else when fully selected
                selectingEmoji = null;

                pickEmoji(closestEmojiChar);
            }
        } else {
            if (selectingEmoji) {
                selectingEmoji.scale.set(100, 100, 1); // Reset the scale
            }
            selectingStart = Date.now();
            selectingEmoji = closestEmoji;
        }

    } else {
        // No emoji in focus
        if (selectingEmoji) {
            selectingEmoji.scale.set(100, 100, 1); // Reset the scale
        }
        selectingEmoji = null;
        selectingStart = 0;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}