import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarProps {
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  owner: string;
  description: string;
  created: string;
  price: string | number;
  city: string;
  km: string;
  whatsapp: string;
  images: ImageCarProps[];
}
interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as CarProps;
        setCar(data);
        console.log("Document data:", data);
      } else {
        console.log("Document does not exist!");
      }
    }
    loadCar();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container>
      <Swiper
        slidesPerView={sliderPerView}
        pagination={{ clickable: true }}
        navigation
      >
        {car?.images.map((image) => (
          <SwiperSlide key={image.name}>
            <img
              src={image.url}
              alt="imagem do carro"
              className="w-full h-96"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {car && (
        <main className="w-full bg-white roudend-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between ">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">{car?.price}</h1>
          </div>
          <p>{car?.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className=" flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className=" flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>
          <strong>Descrição: </strong>
          <p className="mb-4">{car?.description}</p>

          <strong>Telefone / WhatsApp: </strong>
          <p className="mb-4">{car?.whatsapp}</p>

          <a
            target="_blank"
            className=" cursor-pointer bg-green-500 w-full text-white flex items-end justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium "
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}`}
          >
            Conversar com vendedo
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
}
