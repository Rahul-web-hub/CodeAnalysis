import gsap from 'gsap';
import './styles.css';
import { useEffect } from 'react';

function LoaderHome() {
  useEffect(() => {
    const loader = document.querySelector("#loader");
    loader.classList.add("load");
    const tl = gsap.timeline();

    tl.set(".loading-screen", {
      top: "0",
    });

    tl.set(".loading-words .home-active-last", {
      display: "block",
      opacity: 0,
    });

    tl.set(".loading-words .home-active-first", {
      opacity: 1,
    });

    if (window.innerWidth > 540) {
      tl.set(".loading-screen .rounded-div-wrap.bottom", {
        height: "10vh",
      });
    } else {
      tl.set(".loading-screen .rounded-div-wrap.bottom", {
        height: "5vh",
      });
    }

    tl.set("html", {
      cursor: "none",
    });

    tl.to(".loading-words", {
      duration: 0.8,
      opacity: 1,
      ease: "Power4.easeOut",
      delay: 0.5,
    });

    tl.to(".loading-words .home-active-last", {
      duration: 0.01,
      opacity: 1,
      delay: 0.15,
    });

    tl.to(".loading-screen", {
      duration: 0.8,
      top: "-100%",
      ease: "Power4.easeInOut",
      delay: 4,
    });

    tl.to(
      ".loading-screen .rounded-div-wrap.bottom",
      {
        duration: 1,
        height: "0vh",
        ease: "Power4.easeInOut",
      },
      "=-.8"
    );

    tl.to(
      ".loading-words",
      {
        duration: 0.3,
        opacity: 0,
        ease: "linear",
      },
      "=-.8"
    );

    tl.set(".loading-screen", {
      top: "calc(-100%)",
    });

    tl.set(".loading-screen .rounded-div-wrap.bottom", {
      height: "0vh",
    });

    tl.call(function () {
      // Do something after the animation completes
    });

    tl.set(
      "html",
      {
        cursor: "auto",
      },
      "=-1.2"
    );

    // Add cleanup logic if needed when the component unmounts
    return () => {
      // Cleanup code here
    };

  }, []); // Use an empty dependency array for componentDidMount behavior

  return (
    <div className="loading-container">
      <div className="loading-screen">
        <div className="rounded-div-wrap top">
          <div className="rounded-div"></div> 
        </div>
        <div className="loading-words">
          <div className="loading-words-wrap">
            <h2 className="home-active home-active-first">Hello</h2>
            <h2 className="home-active">Hola</h2>
            <h2 className="home-active">Привіт</h2>
            <h2 className="home-active">Ciao</h2>
            <h2 className="home-active">Olá</h2>
            <h2 className="home-active">Bonjour</h2>
            <h2 className="home-active">Witam</h2>
            <h2 className="home-active-last">Sveiki</h2>
          </div>
         </div>
        <div className="rounded-div-wrap bottom">
          <div className="rounded-div"></div>
        </div>
        <div id="loader">
          <svg
            id="load-circle"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 253.4 253.4"
            style={{ enableBackground: "new 0 0 253.4 253.4" }}
            xmlSpace="preserve"
          >
            <circle cx="126.7" cy="126.7" r="124.2"></circle>
          </svg>
          <svg
            className="load-back"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 253.4 253.4"
            style={{ enableBackground: "new 0 0 253.4 253.4" }}
            xmlSpace="preserve"
          >
            <circle cx="126.7" cy="126.7" r="124.2"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LoaderHome;
