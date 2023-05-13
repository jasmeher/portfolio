import Experience from "./Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Screen from "./Screen.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.view = this.experience.navigation.view.spherical.value;
    this.view.target = this.experience.navigation.view.target;
    this.view.spherical = this.experience.navigation.view.spherical;
    this.view.drag = this.experience.navigation.view.drag;
    this.resources = this.experience.resources;

    GSAP.registerPlugin(ScrollTrigger);
    this.setScrollTrigger();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    mm.add("(min-width: 969px)", () => {
      console.log("Desktop");
      this.view.target.value.x = 1.2273275999652686;
      this.view.target.value.y = 4.405879057681875;
      this.view.target.value.z = -0.505394712061917;

      this.view.spherical.value.phi = 1.1008910447587323;
      this.view.spherical.value.radius = 80;
      this.view.spherical.value.theta = -0.7894001342761974;

      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: -3.275509108156625,
            y: 7.447816297355448,
            z: -6.626364337931035,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.1649251931778897,
            radius: 26.25,
            theta: -0.533263540599572,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 968,
            y: 514,
          },
          "same"
        );

      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 4.152589667651412,
            y: 8.09505251206935,
            z: -4.853458791976249,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.182267388685632,
            radius: 11.25,
            theta: -0.02668108951746484,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 897,
            y: 318,
          },
          "same"
        );

      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 6.530733017032069,
            y: 4.6799693172339145,
            z: 4.316119718363392,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.2382972685523987,
            radius: 11.25,
            theta: -0.5422478178122014,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 766,
            y: 388,
          },
          "same"
        );

      this.fourthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 5.601036047686826,
            y: 6.4922161643776,
            z: 7.861915582070117,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.6905388281184688,
            radius: 13.75,
            theta: -1.493775766886922,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 466,
            y: 235,
          },
          "same"
        );

      this.fifthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fifth",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: -4.553991628750336,
            y: 8.042402439901233,
            z: -2.1441683608282327,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.13024002945085,
            radius: 2.5,
            theta: -0.4185356913485917,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 858,
            y: 335,
          },
          "same"
        );

      this.sixthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".sixth",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 2.0528209642224464,
            y: 5.938555450316649,
            z: 0.8975112884096139,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.5304534570705814,
            radius: 31.25,
            theta: -0.44121445224704464,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 849,
            y: 301,
          },
          "same"
        );

      ScrollTrigger.create({
        trigger: ".work",
        onEnter: () => {
          this.laptopScreen = new Screen(
            this.resources.items.laptopScreen.scene.children[0],
            "/assets/work.mp4"
          );
        },
      });

      ScrollTrigger.create({
        trigger: ".contact",
        onEnter: () => {
          this.phoneScreen = new Screen(
            this.resources.items.phoneScreen.scene.children[0],
            "/assets/phone.mp4"
          );
          this.phoneScreen.model.element.loop = false;
        },
      });
    });

    mm.add("(max-width: 968px)", () => {
      console.log("Mobile");
      this.view.target.value.x = 0.9497279629199004;
      this.view.target.value.y = 4.432101385731837;
      this.view.target.value.z = -0.8074721581880612;

      this.view.spherical.value.phi = 1.0635377467554916;
      this.view.spherical.value.radius = 138.33333282470704;
      this.view.spherical.value.theta = -0.7920680895174649;

      // this.view.drag.previous.x = 265;
      // this.view.drag.previous.y = 267;

      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 2.275509108156625,
            y: 7.447816297355448,
            z: -6.626364337931035,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.1649251931778897,
            radius: 26.25,
            theta: -0.533263540599572,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 968,
            y: 514,
          },
          "same"
        );

      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 1.952589667651412,
            y: 8.09505251206935,
            z: -4.853458791976249,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.182267388685632,
            radius: 11.25,
            theta: -0.02668108951746484,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 897,
            y: 318,
          },
          "same"
        );

      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 7.530733017032069,
            y: 4.6799693172339145,
            z: 4.316119718363392,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.2382972685523987,
            radius: 11.25,
            theta: -0.5422478178122014,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 766,
            y: 388,
          },
          "same"
        );

      this.fourthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 6.364179,
            y: 9.34141,
            z: 1.47899,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.234819968846544,
            radius: 20,
            theta: -0.9435353566551877,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 219.40000915527344,
            y: 182.40000915527344,
          },
          "same"
        );

      this.fifthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fifth",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: -2.657732,
            y: 8.506362,
            z: -3.975316,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 0.8574700833225238,
            radius: 6.25,
            theta: -0.4237986589215408,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 323.4000244140625,
            y: 301.6000061035156,
          },
          "same"
        );

      this.sixthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".sixth",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
        .to(
          this.view.target.value,
          {
            x: 0.743839,
            y: 5.628852,
            z: -0.818218,
          },
          "same"
        )
        .to(
          this.view.spherical.value,
          {
            phi: 1.528523,
            radius: 26.25,
            theta: -0.35237,
          },
          "same"
        )
        .to(
          this.view.drag.previous,
          {
            x: 1052,
            y: 261,
          },
          "same"
        );

      ScrollTrigger.create({
        trigger: ".contact",
        onEnter: () => {
          this.phoneScreen = new Screen(
            this.resources.items.phoneScreen.scene.children[0],
            "/assets/phone.mp4"
          );
          this.phoneScreen.model.element.loop = false;
        },
      });
    });
  }
}
