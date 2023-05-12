import * as THREE from "three";
import Experience from "./Experience.js";
import Baked from "./Baked.js";
import Screen from "./Screen.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setBaked();
        this.setScreens();
      }
    });
  }

  // setDummy()
  // {
  //     this.resources.items.lennaTexture.encoding = THREE.sRGBEncoding

  //     const cube = new THREE.Mesh(
  //         new THREE.BoxGeometry(1, 1, 1),
  //         new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
  //     )
  //     this.scene.add(cube)
  // }

  setBaked() {
    this.baked = new Baked();
  }

  setScreens() {
    this.tvScreen = new Screen(
      this.resources.items.tvScreen.scene.children[0],
      "/assets/fifa.mp4"
    );
    this.initialScreen = new Screen(
      this.resources.items.initialScreen.scene.children[0],
      "/assets/laptop1.mp4"
    );
  }

  resize() {}

  update() {}

  destroy() {}
}
