import { useEffect } from "react";

//style
import "./style.css";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function Index() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <footer>
        <section className="footer__container">
          <h3
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
          >
            Teste para vaga de desenvolvedor front-end
          </h3>
          <p
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-anchor-placement="top-bottom"
          >
            Desenvolvido por{" "}
            <a
              href="https://github.com/12Gustavo21"
              target="_blank"
              rel="noreferrer"
            >
              Gustavo Almeida
            </a>
          </p>
        </section>
      </footer>
    </>
  );
}
