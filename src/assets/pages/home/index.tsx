import { useEffect } from "react";

//components
import Layout from "../../components/layout";
import MedicineList from "../../components/medicineList";
import Animation from "../../components/animations/medicine";

//styles
import "./style.css";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function Index() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <Layout>
      <main className="main">
        <section className="main__container">
          <div className="main__container__text">
            <h2 data-aos="fade-up" data-aos-duration="2000">
              Bem-vindo ao <span>Bulário Eletrônico</span>
            </h2>
            <p data-aos="fade-up" data-aos-duration="3000">
              Aqui você encontra informações sobre os mais diversos remédios
              disponíveis no mercado.
            </p>
          </div>
          <div className="main__container__animation">
            <Animation />
          </div>
        </section>
        <MedicineList />
      </main>
    </Layout>
  );
}
