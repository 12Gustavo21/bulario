import { useEffect } from "react";

//react-router-dom
import { Link } from "react-router-dom";

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
      <main>
        <section className="container">
          <h2 data-aos="fade-up" data-aos-duration="2000">
            Vá para a página principal
          </h2>
          <p>
            <Link to="/" data-aos="fade-up" data-aos-duration="3000">
              <button>Home</button>
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
