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

    drawCube() {
        this.renderedCube = true;
        this.renderedIntexsoft = false;
    }

    drawIntexsoft() {
        this.renderedCube = false;
        this.renderedIntexsoft = true;
    }

}
