import { useEffect, useState } from "react";

//libs
import { useParams } from "react-router-dom";

//types
import { Medicine } from "../../../../types";

//axios
import axios from "axios";

// pdf
import samplePDF from "../../../../assets/pdf/pdf_sample.pdf";

//components
import Layout from "../../../components/layout";
import Animation from "../../../components/animations/pills";

//style
import "./style.css";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function Index() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState<Medicine>();

  useEffect(() => {
    axios.get(`https://api-storage-medicine.vercel.app/data/${id}`).then((response) => {
      setMedicine(response.data);
      console.log(response.data);
    });

    AOS.init();

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Layout>
        <main>
          <section className="medicine__details">
            <div className="medicine__details__content">
              <h1 data-aos="fade-up" data-aos-duration="2000">
                Detalhes do Medicamento
              </h1>
              <p data-aos="fade-up" data-aos-duration="3000">
                Nome: {medicine?.name}
              </p>
              <p data-aos="fade-up" data-aos-duration="3000">
                Publicado em:{" "}
                {new Date(medicine?.published_at ?? "").toLocaleDateString(
                  "pt-BR"
                )}
              </p>
              <p data-aos="fade-up" data-aos-duration="3000">
                Empressa: {medicine?.company}
              </p>
            </div>

            <div className="medicine__details__documents">
              <h2 data-aos="fade-up" data-aos-duration="2000">
                Documentos
              </h2>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {medicine?.documents.map((document: any) => (
                <div
                  key={document.id}
                  className="medicine__details__document"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  <p>Tipo: {document.type}</p>
                  <a href={samplePDF} target="_blank" rel="noreferrer">
                    Visualizar
                  </a>
                </div>
              ))}
            </div>
          </section>
          <section className="medicine__details__animation">
            <Animation />
          </section>
        </main>
      </Layout>
    </>
  );
}
