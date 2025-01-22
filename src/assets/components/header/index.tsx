import { useState, useEffect } from "react";

import Pills from "/pills.svg";

//react-router-dom
import { Link } from "react-router-dom";

//styles
import "./style.css";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function Index() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    AOS.init();
  }, []);

  return (
    <>
      <header className={scroll ? "header__scroll" : "header"}>
        <section className="header__container">
          <div
            className="header__container__logo"
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <Link to="/">
              <img src={Pills} alt="Pills" />
              <h1 data-testid="cypress-title">Bulário Eletrônico</h1>
            </Link>
          </div>
          <nav
            className="header__container__nav"
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <Link to="/">Home</Link>
          </nav>
        </section>
      </header>
    </>
  );
}
