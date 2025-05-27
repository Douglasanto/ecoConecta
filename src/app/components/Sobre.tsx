export default function Sobre() {
  return (
    <section id="sobre" className="bg-green-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Sobre Nós</h3>
        <p className="mb-6 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          O EcoConecta nasceu com a missão de valorizar o trabalho de quem
          recicla e criar pontes com empresas que buscam responsabilidade
          ambiental.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Missão */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-green-700">Missão</h4>
            <p className="text-sm sm:text-base">
              Conectar recicladores a empresas de forma justa, promovendo
              sustentabilidade e geração de renda.
            </p>
          </div>
          
          {/* Visão */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-green-700">Visão</h4>
            <p className="text-sm sm:text-base">
              Ser a principal plataforma de integração entre recicladores e
              empresas sustentáveis no Brasil.
            </p>
          </div>
          
          {/* Valores */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-green-700">Valores</h4>
            <p className="text-sm sm:text-base">
              Transparência, responsabilidade ambiental, inclusão social e
              inovação.
            </p>
          </div>
        </div>
        
        {/* Espaço reservado para link futuro */}
        <div className="mt-8 sm:mt-10">
          {/* <a href="#" className="text-green-700 underline hover:text-green-900 text-sm sm:text-base">
            Conheça nossa história completa
          </a> */}
        </div>
      </div>
    </section>
  );
}