//Todo Optimize later
"use client";
import React from "react";
import "./styles.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase, SplitText } from "gsap/all";
import { projectsData } from "./landingPageData";

gsap.registerPlugin(CustomEase, SplitText);

CustomEase.create("hop", "0.9,0,0.1,1");

const LandingPage = () => {
  useGSAP(() => {
    const projectsContainer = document.querySelector(".projects");
    const locationsContainer = document.querySelector(".locations");
    const gridImages = gsap.utils.toArray(".img");
    const heroImage = document.querySelector(".img.hero-img");

    const images = gridImages.filter((img) => img !== heroImage);

    const introCopy = new SplitText(".intro-copy h3", {
      type: "words",
    });

    const titleHeading = new SplitText(".title h1", {
      type: "words",
    });

    const allImageSources = Array.from({ length: 35 }, (_, i) => `/img-${i+1}.webp`)

    const getRandomImageSet = () => {
      const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    function initializeDynamicContent() {
      projectsData.forEach((project) => {
        const projectItem = document.createElement("div");
        projectItem.className = "project-item";

        const projectName = document.createElement("p");
        projectName.textContent = project.name;

        const directorName = document.createElement("p");
        directorName.textContent = project.director;

        projectItem.appendChild(projectName);
        projectItem.appendChild(directorName);

        projectsContainer?.appendChild(projectItem);
      });

      projectsData.forEach((project) => {
        const locationItem = document.createElement("div");
        locationItem.className = "location-item";

        const locationName = document.createElement("p");
        locationName.textContent = project.location;

        locationItem.appendChild(locationName);
        locationsContainer?.appendChild(locationItem);
      });
    }
    function startImageRotation() {
      const totalCycles = 20;

      for (let cycle = 0; cycle < totalCycles; cycle++) {
        const randomImages = getRandomImageSet();

        gsap.to(
          {},
          {
            duration: 0,
            delay: cycle * 0.15,
            onComplete: () => {
              gridImages.forEach((img, index) => {
                const imgElement = img.querySelector("img");

                if (cycle === totalCycles - 1 && img === heroImage) {
                  imgElement.src = "/img-8.webp";

                  gsap.set(".hero-img img", { scale: 2 });
                } else {
                  imgElement.src = randomImages[index];
                }
              });
            },
          }
        );
      }
    }

    function setupInitialStates() {
      gsap.set("nav", { y: "-125%" });

      gsap.set(introCopy.words, { y: "110%" });

      gsap.set(titleHeading.words, { y: "110%" });
    }

    function init() {
      initializeDynamicContent();
      setupInitialStates();
      createAnimationTimelines();
    }

    init();

    function createAnimationTimelines() {
      const overlayTimeline = gsap.timeline();
      const imageTimeline = gsap.timeline();
      const textTimeline = gsap.timeline();

      overlayTimeline.to(".logo-line-1", {
        backgroundPosition: "0% 0%",
        color: "#fff",
        duration: 1,
        ease: "none",
        delay: 0.5,
        onComplete: () => {
          gsap.to(".logo-line-2", {
            backgroundPosition: "0% 0%",
            color: "#fff",
            duration: 1,
            ease: "none",
          });
        },
      });
      overlayTimeline.to([".projects-header", ".project-item"], {
        opacity: 1,
        duration: 0.15,
        stagger: 0.075,
        delay: 1,
      });
      overlayTimeline.to(
        [".locations-header", ".location-item"],
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.15,
        },
        "<"
      );
      overlayTimeline.to(".project-item", {
        color: "#fff",
        duration: 0.15,
        stagger: 0.075,
      });
      overlayTimeline.to(
        ".location-item",
        {
          color: "#fff",
          duration: 0.15,
          stagger: 0.075,
        },
        "<"
      );
      overlayTimeline.to([".projects-header", ".project-item"], {
        opacity: 0,
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to(
        [".locations-header", ".location-item"],
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
        },
        "<"
      );
      overlayTimeline.to(".overlay", {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });

      imageTimeline.to(".img", {
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: "hop",
        onStart: () => {
          setTimeout(() => {
            startImageRotation();
            gsap.to(".loader", { opacity: 0, duration: 0.3 });
          }, 1000);
        },
      });

      imageTimeline.to(images, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 2.5,
        ease: "hop",
        stagger: 0.05,
      });
      imageTimeline.to(".hero-img", {
        y: -50,
        duration: 1,
        ease: "hop",
      });
      imageTimeline.to(".hero-img", {
        scale: 4,
        clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
        duration: 1.5,
        ease: "hop",
        onStart: () => {
          gsap.to(".hero-img img", {
            scale: 1,
            duration: 1.5,
            ease: "hop",
          });
          gsap.to(".banner-img", { scale: 1, delay: 0.5, duration: 0.5 });
          gsap.to("nav", { y: "0%", delay: 0.25, duration: 1 });
        },
      });
      imageTimeline.to(
        ".banner-img-1",
        {
          left: "40%",
          rotate: -20,
          duration: 1.5,
          delay: 0.5,
          ease: "hop",
        },
        "<"
      );
      imageTimeline.to(
        ".banner-img-2",
        {
          left: "60%",
          rotate: 20,
          duration: 1.5,
          ease: "hop",
        },
        "<"
      );

      textTimeline
        .to(titleHeading.words, {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          delay: 9.5,
          ease: "power3.out",
        })
        .to(
          introCopy.words,
          {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            delay: 0.25,
            ease: "power3.out",
          },
          "<"
        );
    }
  }, {});
  return (
    <>
      <div className="overlay">
        <div className="projects">
          <div className="projects-header">
            <p>Projects</p>
            <p>Directors</p>
          </div>
        </div>
        <div className="loader">
          <h1 className="logo-line-1">Daksh</h1>
          <h1 className="logo-line-2">Singh</h1>
        </div>
        <div className="locations">
          <div className="locations-header">
            <p>Location</p>
          </div>
        </div>
      </div>

      <div className="image-grid">
        <div className="grid-row">
          <div className="img">
            <img src="/img-1.webp" alt="" />
          </div>
          <div className="img">
            <img src="/img-2.webp" alt="" />
          </div>
          <div className="img">
            <img src="/img-3.webp" alt="" />
          </div>
        </div>
        <div className="grid-row">
          <div className="img">
            <img src="/img-4.webp" alt="" />
          </div>
          <div className="img hero-img">
            <img src="/img-5.webp" alt="" />
          </div>
          <div className="img">
            <img src="/img-6.webp" alt="" />
          </div>
        </div>
        <div className="grid-row">
          <div className="img">
            <img src="/img-7.webp" alt="" />
          </div>
          <div className="img">
            <img src="/img-8.webp" alt="" />
          </div>
          <div className="img">
            <img src="/img-9.webp" alt="" />
          </div>
        </div>
      </div>

      <nav>
        <div className="links">
          <a href="#">Index</a>
          <a href="#">Work</a>
        </div>
        <div className="nav-logo">
          <a href="#">
            Daksh
            <br />
            Singh
          </a>
        </div>
        <div className="links">
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <div className="banner-img banner-img-1">
        <img src="/img-7.webp" alt="" />
      </div>
      <div className="banner-img banner-img-2">
        <img src="/img-10.webp" alt="" />
      </div>

      {/* Change according to your design */}
      <div className="intro-copy">
        <h3>Creative Solutions</h3>
        <h3>Impactful Results</h3>
      </div>

      <div className="title">
        <h1>Crafting Beautiful Elevated Experiences</h1>
      </div>
    </>
  );
};

export default LandingPage;
