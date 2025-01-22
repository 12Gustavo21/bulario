import { useEffect } from "react";

//lottie
import Lottie from "lottie-react";
import animation from "../../../lottie/pills.json";

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
    <>
      <Lottie
        animationData={animation}
        className="Lottie"
        data-aos="fade-up"
        data-aos-duration="3000"
      />
    </>
  );
}
