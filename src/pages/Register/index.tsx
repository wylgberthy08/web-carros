import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { useEffect, useContext } from "react";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório "),
  email: z
    .string()
    .email("Insira um e-mail válido")
    .nonempty("O campo email é obrigatório"),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const { handleInfoUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });
        console.log("usuario cadastrado com sucesso!!", data);
        navigate("/dashboard", { replace: true });
      })
      .catch((errors) => {
        console.log("Ops ouve o seguinte erro:", errors);
      });
  }
  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);
  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4 ">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={LogoImg} alt="logo" className="w-full" />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-xl w-full rounded-lg p-4"
        >
          <div className="mb-3">
            <Input
              placeholder="Digite seu nome completo..."
              name="name"
              type="text"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              placeholder="Digite seu e-mail..."
              name="email"
              type="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              placeholder="Digite sua senha..."
              name="password"
              type="password"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
          >
            Acessar
          </button>
        </form>
        <Link to="/login">Já possui uma conta faça o login</Link>
      </div>
    </Container>
  );
}
