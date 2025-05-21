export default function Sobre() {
  return (
    <section id="sobre" className="bg-green-50 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-6">Sobre Nós</h3>
        <p className="mb-6">
          O EcoConecta nasceu com a missão de valorizar o trabalho de quem
          recicla e criar pontes com empresas que buscam responsabilidade
          ambiental.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-bold text-lg mb-2">Missão</h4>
            <p>
              Conectar recicladores a empresas de forma justa, promovendo
              sustentabilidade e geração de renda.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-bold text-lg mb-2">Visão</h4>
            <p>
              Ser a principal plataforma de integração entre recicladores e
              empresas sustentáveis no Brasil.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-bold text-lg mb-2">Valores</h4>
            <p>
              Transparência, responsabilidade ambiental, inclusão social e
              inovação.
            </p>
          </div>
        </div>
        <div className="mt-8">
          {/* <a href="#" className="text-green-700 underline hover:text-green-900">
            Conheça nossa história completa
          </a> */}
        </div>
      </div>
    </section>
  );
}
