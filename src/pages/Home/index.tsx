import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o nome do carro..."
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
          buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2x1 mb-4">
        Carros novos e usados em todo Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202310/20231014/fiat-argo-1.0-firefly-flex-drive-manual-wmimagem12343705972.jpg?s=fill&w=1920&h=1440&q=75"
            alt="carro"
          />
          <p className="font-bold mt-1 mb-2 px-2">BMW 3201</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">
              Ano 2016/2016 | 23.000 KM
            </span>
            <strong className="text-black font-medium text-x1">
              R$ 190.000
            </strong>
          </div>
          <div className="w-full h-px bg-slate-700 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-zinc-700">Campo grande-MS</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
