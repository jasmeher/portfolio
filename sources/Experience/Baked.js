import * as THREE from "three";
import GSAP from "gsap";
import Experience from "./Experience.js";

export default class Baked {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.theme = this.experience.theme;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "baked",
        expanded: true,
      });
    }

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });

    this.setModel();
    this.setFloor();
  }

  setModel() {
    this.model = {};
    this.model.mesh = this.resources.items.roomModel.scene;
    this.nightTexture = this.resources.items.nightTexture;
    this.nightTexture.colorSpace = THREE.SRGBColorSpace;
    this.nightTexture.flipY = false;
    this.dayTexture = this.resources.items.dayTexture;
    this.dayTexture.colorSpace = THREE.SRGBColorSpace;
    this.dayTexture.flipY = false;

    const vertexShader = `
    varying vec2 vUv; 

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
  precision highp float; 

  varying vec2 vUv; 

  uniform float dispFactor; 

  uniform sampler2D disp; 
  uniform sampler2D tex1; 
  uniform sampler2D tex2; 

  void main() {
    vec2 uv = vUv;

    vec4 _currentImage;
    vec4 _nextImage;

    float intensity = 0.0;

    vec4 orig1 = texture2D(tex1, uv);
    vec4 orig2 = texture2D(tex2, uv);

    _currentImage = texture2D(tex1, vec2(
      uv.x, 
      uv.y + dispFactor * (orig2 * intensity)
    ));

    _nextImage = texture2D(tex2, vec2(
      uv.x, 
      uv.y + (1.0 - dispFactor) * (orig1 * intensity)
    ));

    vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

    gl_FragColor = finalTexture;
  }
`;

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        dispFactor: {
          type: "f",
          value: 1,
        },
        tex1: {
          type: "t",
          value: this.nightTexture,
        },
        tex2: {
          type: "t",
          value: this.dayTexture,
        },
      },
    });

    this.model.mesh.traverse((_child) => {
      if (_child instanceof THREE.Mesh || THREE.Group) {
        _child.material = this.material;

        if (_child.name === "ShelfTV") {
          _child.material.side = THREE.DoubleSide;
        }
      }
    });

    this.scene.add(this.model.mesh);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 6);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    if (this.debug) {
      this.debugFolder.addInput(
        this.model.material.uniforms.uNightMix,
        "value",
        { label: "uNightMix", min: 0, max: 1 }
      );
    }
  }

  setFloor() {
    this.floor = {};
    this.floor.mesh = this.resources.items.floor.scene;
    this.floorDayTexture = this.resources.items.floorDayTexture;
    this.floorDayTexture.colorSpace = THREE.SRGBColorSpace;
    this.floorDayTexture.flipY = false;
    this.floorNightTexture = this.resources.items.floorNightTexture;
    this.floorNightTexture.colorSpace = THREE.SRGBColorSpace;
    this.floorNightTexture.flipY = false;

    const vertexShader = `
    varying vec2 vUv; 

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
  precision highp float; 

  varying vec2 vUv; 

  uniform float dispFactor; 

  uniform sampler2D disp; 
  uniform sampler2D tex1; 
  uniform sampler2D tex2; 

  void main() {
    vec2 uv = vUv;

    vec4 _currentImage;
    vec4 _nextImage;

    float intensity = 0.0;

    vec4 orig1 = texture2D(tex1, uv);
    vec4 orig2 = texture2D(tex2, uv);

    _currentImage = texture2D(tex1, vec2(
      uv.x, 
      uv.y + dispFactor * (orig2 * intensity)
    ));

    _nextImage = texture2D(tex2, vec2(
      uv.x, 
      uv.y + (1.0 - dispFactor) * (orig1 * intensity)
    ));

    vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

    gl_FragColor = finalTexture;
  }
`;

    this.floorMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        dispFactor: {
          type: "f",
          value: 1,
        },
        tex1: {
          type: "t",
          value: this.floorNightTexture,
        },
        tex2: {
          type: "t",
          value: this.floorDayTexture,
        },
      },
    });

    this.floor.mesh.traverse((_child) => {
      if (_child instanceof THREE.Mesh || THREE.Group) {
        _child.material = this.floorMaterial;
      }
    });

    this.scene.add(this.floor.mesh);
  }

  switchTheme(theme) {
    // console.log(theme);
    // console.log(this.material);
    if (theme === "dark") {
      GSAP.to(this.material.uniforms.dispFactor, {
        value: 0,
        duration: 0.75,
      });
      GSAP.to(this.floorMaterial.uniforms.dispFactor, {
        value: 0,
        duration: 0.75,
      });
    } else {
      GSAP.to(this.material.uniforms.dispFactor, {
        value: 1,
        duration: 0.75,
      });
      GSAP.to(this.floorMaterial.uniforms.dispFactor, {
        value: 1,
        duration: 0.75,
      });
    }
  }
}
