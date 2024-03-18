import { useEffect, useState, useContext } from "react";
import { PanelHeader } from "../../components/PanelHeader";
import { Container } from "../../components/container";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiTrash2 } from "react-icons/fi";

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}
interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    //busca carros
    if (!user?.uid) {
      return;
    }
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user?.uid));
      getDocs(queryRef).then((snapshot) => {
        const listCars = [] as CarProps[];

        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });
        setCars(listCars);
      });
    }
    loadCars();
  }, []);
  function handleLoadImage(id: string) {
    setLoadImages((prev) => [...prev, id]);
  }

  async function handleDeleteCar(car: CarProps) {
    const itemCar = car;
    const docRef = doc(db, "cars", itemCar.id);
    await deleteDoc(docRef);
    car.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
        setCars(cars.filter((car) => car.id !== itemCar.id));
      } catch (error) {
        console.log("Erro ao excluir a imagem:  ->", error);
      }
    });
  }
  return (
    <Container>
      <PanelHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section className="w-full bg-white rounded-lg relative">
              <button
                className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
                onClick={() => handleDeleteCar(car)}
              >
                <FiTrash2 size={26} color="#000" />
              </button>
              <div
                className="w-full h-72 rounded-lg bg-slate-200"
                style={{
                  display: loadImages.includes(car.id) ? "none" : "block",
                }}
              />

              <img
                className="w-full rounded-lg mb-2 max-h-72"
                src={car.images[0].url}
                alt="carro"
                onLoad={() => handleLoadImage(car.id)}
                style={{
                  display: loadImages.includes(car.id) ? "block" : "none",
                }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">{car.year}</span>
                <strong className="text-black font-medium text-x1">
                  R$ {car.price}
                </strong>
              </div>
              <div className="w-full h-px bg-slate-700 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}
