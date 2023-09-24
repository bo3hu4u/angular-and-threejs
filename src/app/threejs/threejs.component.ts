import {Component} from '@angular/core';
import * as THREE from 'three';
import {Color} from "three/src/math/Color";
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import {ImageUtils, LoadingManager, Mesh, MeshMatcapMaterial, TextureLoader, Vector3} from "three";
import {Font} from "three/examples/jsm/loaders/FontLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import TWEEN from '@tweenjs/tween.js'

@Component({
    selector: 'app-threejs',
    templateUrl: './threejs.component.html',
    styleUrls: ['./threejs.component.css']
})
export class ThreejsComponent {
    renderedCube: boolean = false;
    renderedIntexsoft: boolean = false;

    camera = new THREE.PerspectiveCamera(75, 2, 0.1, 2000);

    material = new THREE.MeshLambertMaterial({color: 0x44aa88});
    boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new THREE.Mesh(this.boxGeometry, this.material);
    timeSpeedX = 0.001;
    timeSpeedY = 0.001;
    timeSpeedZ = 0.001;

    drawCube() {
        this.renderedCube = true;
        this.renderedIntexsoft = false;
        setTimeout(() => {
            const canvas = document.getElementById('canvas')!;
            const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
            this.camera.position.z = 3;
            const scene = new THREE.Scene();

            scene.add(this.cube);
            let light = new THREE.DirectionalLight(new Color(255, 255, 0), 0.5);
            scene.add(light);

            scene.background = new Color(255, 255, 255);
            const helper = new THREE.CameraHelper(this.camera);
            scene.add(helper);
            renderer.setAnimationLoop((time, f) => {
                time *= (this.timeSpeedX * this.timeSpeedY * this.timeSpeedZ);  // convert time to seconds
                this.cube.rotation.x = time * this.timeSpeedX;
                this.cube.rotation.y = time * this.timeSpeedY;
                this.cube.rotation.z = time * this.timeSpeedZ;

                renderer.render(scene, this.camera);
            })
        })
    }

    symbolMeshes: Mesh[] = [];

    heartPositions: Vector3[] = this.buildHearPointPositions();

    buildHearPointPositions(): Vector3[] {
        let rightHeardSidePositions = [
            //right heart side
            new Vector3(30, 195, 0),
            new Vector3(65, 220, 0),
            new Vector3(110, 195, 0),
            new Vector3(142, 150, 0),
            new Vector3(145, 95, 0),
            new Vector3(128, 15, 0),
            new Vector3(90, -40, 0),
            new Vector3(42, -90, 0),
        ];

        const arrayLength = rightHeardSidePositions.length;
        let leftHeardSidePositions: Vector3[] = [];
        rightHeardSidePositions.map((rp, i) => {
            leftHeardSidePositions[arrayLength - i - 1] = new Vector3(-rp.x, rp.y, rp.z)
        });
        return [...leftHeardSidePositions,
            new Vector3(0, 150, 0), //middle dot
            ...rightHeardSidePositions,
            new Vector3(0, -150, 0) //bottom dot
        ];
    }


    drawIntexsoft() {
        this.renderedCube = false;
        this.renderedIntexsoft = true;

        setTimeout(() => {
            const canvas = document.getElementById('canvas-intex')!;
            const scene = new THREE.Scene();
            scene.background = new THREE.Color("#ffffff");
            // scene.background = new THREE.Color("#a0b8e0");
            // scene.background = new Color(230, 230, 230);
            // scene.backgroundBlurriness = 30;
            const textureLoader = new TextureLoader();

            const fontLoader = new FontLoader(new LoadingManager());
            const textForRendering = "I.N.T.E.X.S.O.F.T.";

            fontLoader.load(
                '/static/fonts/gentilis_regular.typeface.json',
                (font: Font) => {
                    console.log("loaded font - ");
                    const textSymbols = Array.from(textForRendering);

                    const fontParams = {
                        font,
                        size: 40,
                        height: 5,
                        curveSegments: 60,
                        bevelEnabled: true,
                        bevelThickness: 0.01,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 20
                    };
                    const fontTexture = textureLoader.load('/static/textures/crate.gif');
                    console.log("loaded texture - " + fontTexture.source.data)

                    textSymbols.forEach((val, i) => {
                        const textGeometry = new TextGeometry(val, fontParams);
                        textGeometry.center();
                        const material = new THREE.MeshMatcapMaterial({
                            matcap: fontTexture,
                            color: "#3c91f3"
                        });

                        const textMesh = new THREE.Mesh(textGeometry, material);
                        let posX = -180 + 20 * i;
                        textMesh.position.set(posX, 0, 0);
                        this.symbolMeshes[i] = textMesh;

                        console.log("Add to scene");
                        scene.add(textMesh);
                    })


                    const camera = new THREE.PerspectiveCamera(
                        75,
                        1,
                        1,
                        1000
                    );
                    camera.position.x = 20;
                    camera.position.y = 80;
                    camera.position.z = 280;
                    scene.add(camera);


                    const controls = new OrbitControls(camera, canvas);

                    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
                    renderer.setPixelRatio(4);

                    console.log("RENDER");

                    renderer.setAnimationLoop((time, f) => {
                        time *= 0.001;
                        camera.position.x = Math.sin(time);
                        camera.position.y = Math.cos(time);
                        camera.lookAt(0, 0, 0);
                        controls.update();
                        TWEEN.update();
                        renderer.render(scene, camera);
                    })
                },
                () => {
                }, () => {
                });


        })


    }

    comeToHeart() {
        this.symbolMeshes.forEach((mesh, i) => {
            const newPos = this.heartPositions[i];
            new TWEEN.Tween(mesh.position)
                .to(
                    newPos,
                    1500
                )
                .start();
            let material: MeshMatcapMaterial = <MeshMatcapMaterial>mesh.material;
            //TODO: чо-то не очень
            new TWEEN.Tween(material.color)
                .to(
                    new THREE.Color("#f83434"), 1500)
                .start();
            // TweenLite.to(mesh.material.color, 1, {
            //     r: col.r,
            //     g: col.g,
            //     b: col.b,
            // });

        })
    }
}
