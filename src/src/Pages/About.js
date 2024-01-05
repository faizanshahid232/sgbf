import React from "react";
import "./About.css";
import mountainbackground from "../Assets/img/mountain-background.png";
import citybackground from "../Assets/img/city-background.png";

const About = () => {
  return (
    <>
      <section
        id="about"
        className=""
        style={{
          height: "60vh",
          background: `linear-gradient(rgba(255,2555,255,1),rgba(255,255,255,0.5)), url(${citybackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-container" data-aos="fade-in">
          <h1
            style={{
              fontSize: "3em",
              lineHeight: 1.25,
              fontFamily: "jaf-bernina-sans",
            }}
          >
            Our Mission
          </h1>
          <div className="col-6">
            <p
              className="text-center"
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                fontSize: "18px",
              }}
            >
              To inspire people and honor places that are the blessings of our
              nation’s legacy, extended by green missionfor safety, health and
              welfare of the humanity in the built-environment.
            </p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="custom_about"
        style={{
          height: "90vh",
          background: `linear-gradient(rgba(255,2555,255,1),rgba(32,168,119,0.4),rgba(32,168,118,0)), url(${mountainbackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-container">
          <h1
            style={{
              color: "#fff",
              fontSize: "3em",
              lineHeight: 1.25,
              fontFamily: "jaf-bernina-sans",
            }}
          >
            Our Goals
          </h1>
          <p
            className="text-center"
            style={{
              width: "45%",
              color: "#fff",
              marginBottom: "20px",
              marginTop: "20px",
              fontSize: "18px",
            }}
          >
            Designed to demonstrate Saudi Arabia’s capacity and the world
            efforts through its national and international policies for the
            environmental impact of the built environment from generation to
            generation.
          </p>
        </div>
      </section>

      <section
        id="objective"
        className="py-5"
        style={{ backgroundColor: "#20A876" }}
      >
        <div className="objective-container text-center" data-aos="fade-in">
          <h1
            style={{
              color: "white",
              paddingBottom: "40px",
              fontSize: "3em",
              lineHeight: 1.25,
              fontFamily: "jaf-bernina-sans",
            }}
          >
            Our Objectives
          </h1>
        </div>
        <div
          className="objective-container text-center pl-5"
          data-aos="fade-in"
        >
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-lg-5 col-md-6">
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Demonstrating the efforts of the Kingdom of Saudi Arabia and the
                Arab world towards sustainable development.
              </p>
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Leading the change to achieve the Sustainable Development Goals.
              </p>
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Assigning the principles. meghodaligues and applications of
                green buildings and sustainability.
              </p>
            </div>
            <div className="col-lg-5 col-md-6">
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Empowering people, decent work and equality in the sectors of
                sustainable development.
              </p>
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Preparing and issuing technical studies induced by digital
                databasing.
              </p>
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Highlight the importance of responsible consumption and
                production practices.
              </p>
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Acknowledging strong institutions, issuing, certification/
                rating marks for excellence by saaf®️.
              </p>
              <p
                className="text-white"
                style={{ display: "list-item", fontSize: "18px" }}
              >
                Enhancing mutual partnerships and representation with national
                and international bodies, councils and committees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
