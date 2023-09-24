import {Component, Input, OnChanges} from '@angular/core';
import * as THREE from "three";
import {Color} from "three/src/math/Color";

@Component({
    selector: 'app-cube',
    templateUrl: './cube.component.html',
    styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnChanges {

    @Input() requiredRender?: boolean;

    camera = new THREE.PerspectiveCamera(75, 2, 0.1, 2000);

    material = new THREE.MeshLambertMaterial({color: 0x44aa88});
    boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new THREE.Mesh(this.boxGeometry, this.material);
    timeSpeedX = 0.001;
    timeSpeedY = 0.001;
    timeSpeedZ = 0.001;

    ngOnChanges(): void {
        this.drawCube();
    }

    drawCube() {
        if (!this.requiredRender) {
            return;
        }
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
                time *= 0.001;
                this.cube.rotation.x = time * this.timeSpeedX;
                this.cube.rotation.y = time * this.timeSpeedY;
                this.cube.rotation.z = time * this.timeSpeedZ;

                renderer.render(scene, this.camera);
            })
        })
    }


}
