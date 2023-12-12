import { PanelHeader } from "../../../components/PanelHeader";
import { Container } from "../../../components/container";

import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidV4 } from "uuid";

import { storage } from "../../../services/firebaseConnection";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatorio"),
  model: z.string().nonempty("O modelo é obrigatorio"),
  year: z.string().nonempty("O ano do carro é obrigatorio"),
  km: z.string().nonempty("O KM do carro é obrigatorio"),
  price: z.string().nonempty("O preço é obrigatorio"),
  city: z.string().nonempty("A cidade é obrigatoria"),
  whatsapp: z
    .string()
    .min(1, "O Telefone é obrigatorio")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone invalido",
    }),
  description: z.string().nonempty("A descrição é obrigatoria "),
});

type FormData = z.infer<typeof schema>;

export function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { user } = useContext(AuthContext);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === "image/png" || image.type === "image/jpeg") {
        await handleUpload(image);
      } else {
        alert("Envie uma imagem jpg ou png!");
      }
    }
  }

  function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }
    const currentUuid = user.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUuid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        console.log(downloadUrl);
      });
    });
  }
  function onsubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <PanelHeader />
      <div className="w-full  bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro </p>
            <Input
              name="name"
              type="text"
              register={register}
              placeholder="Ex: Onix 1.0..."
              error={errors.name?.message}
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Model do carro </p>
            <Input
              name="model"
              type="text"
              register={register}
              placeholder="Ex: 1.0 Flex PLUS MANUAL..."
              error={errors.model?.message}
            />
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano do carro </p>
              <Input
                name="year"
                type="text"
                register={register}
                placeholder="Ex:2016/2017..."
                error={errors.year?.message}
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">Km rodados </p>
              <Input
                name="km"
                type="text"
                register={register}
                placeholder="Ex: 23.900..."
                error={errors.km?.message}
              />
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Valor em R$ </p>
            <Input
              name="price"
              type="text"
              register={register}
              placeholder="Ex: R$ 23.000,00."
              error={errors.price?.message}
            />
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                name="city"
                type="text"
                register={register}
                placeholder="Ex:São Sebastião do Uatumã"
                error={errors.city?.message}
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone/WhatsApp</p>
              <Input
                name="whatsapp"
                type="text"
                register={register}
                placeholder="Ex: (92) 99225-7869"
                error={errors.whatsapp?.message}
              />
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Telefone/WhatsApp</p>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição completa sobre o carro..."
            />
            {errors.description && (
              <p className="mb-1 text-red-500 ">{errors.description.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
