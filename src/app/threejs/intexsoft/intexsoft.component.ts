import {Component, Input, OnChanges} from '@angular/core';
import {LoadingManager, Mesh, MeshMatcapMaterial, TextureLoader, Vector3} from "three";
import * as THREE from "three";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import TWEEN from "@tweenjs/tween.js";

@Component({
    selector: 'app-intexsoft',
    templateUrl: './intexsoft.component.html',
    styleUrls: ['./intexsoft.component.css']
})
export class IntexsoftComponent implements OnChanges {
    @Input() requiredRender?: boolean;

    ngOnChanges(): void {
        this.drawIntexsoft();
    }

    symbolMeshes: Mesh[] = [];
    heartPositions: Vector3[] = this.buildHearPointPositions();

    drawIntexsoft() {
        if (!this.requiredRender) {
            return;
        }
        setTimeout(() => {
            const canvas = document.getElementById('canvas-intex')!;
            const scene = new THREE.Scene();
            scene.background = new THREE.Color("#ffffff");

            const textureLoader = new TextureLoader();

            const fontLoader = new FontLoader(new LoadingManager());
            const textForRendering = "I.N.T.E.X.S.O.F.T.";

            fontLoader.load(
                '/static/fonts/gentilis_regular.typeface.json',
                (font: Font) => {
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

    private buildHearPointPositions(): Vector3[] {
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
            new TWEEN.Tween(material.color)
                .to(
                    new THREE.Color("#f83434"), 1500)
                .start();
        })
    }
}
