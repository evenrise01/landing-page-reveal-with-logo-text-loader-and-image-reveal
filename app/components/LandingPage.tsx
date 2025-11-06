import React from "react";

const LandingPage = () => {
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
        <div className="location">
          <div className="locations-header">
            <p>Location</p>
          </div>
        </div>
      </div>

      <div className="image-grid">
        <div className="grid-row">
          <div className="img">
            <img src="/img-01.png" alt="" />
          </div>
          <div className="img">
            <img src="/img-02.png" alt="" />
          </div>
          <div className="img">
            <img src="/img-03.png" alt="" />
          </div>
        </div>
        <div className="grid-row">
          <div className="img">
            <img src="/img-04.png" alt="" />
          </div>
          <div className="img hero-img">
            <img src="/img-05.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img-06.png" alt="" />
          </div>
        </div>
        <div className="grid-row">
          <div className="img">
            <img src="/img-07.png" alt="" />
          </div>
          <div className="img">
            <img src="/img-08.png" alt="" />
          </div>
          <div className="img">
            <img src="/img-09.png" alt="" />
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
        <img src="/img-07.png" alt="" />
      </div>
      <div className="banner-img banner-img-2">
        <img src="/img-10.jpg" alt="" />
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
