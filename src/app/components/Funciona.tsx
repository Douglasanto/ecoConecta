export default function Funciona() {
  return (
    <section id="funciona" className="py-12 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-center">Como Funciona</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
          {/* Item 1 */}
          <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📝</div>
            <h4 className="font-bold mb-3 text-lg sm:text-base md:text-lg">Cadastro de cooperativas e empresas</h4>
            <p className="text-sm sm:text-base">Todos se inscrevem de forma simples e segura.</p>
          </div>
          
          {/* Item 2 */}
          <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🔗</div>
            <h4 className="font-bold mb-3 text-lg sm:text-base md:text-lg">Conexão entre as partes</h4>
            <p className="text-sm sm:text-base">Negociações diretas e transparentes via plataforma.</p>
          </div>
          
          {/* Item 3 */}
          <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📦</div>
            <h4 className="font-bold mb-3 text-lg sm:text-base md:text-lg">Comércio justo de recicláveis</h4>
            <p className="text-sm sm:text-base">Valorização do trabalho e materiais com segurança.</p>
          </div>
        </div>
        
        <div className="text-center mt-8 sm:mt-10">
          <a 
            href="/cadastro" 
            className="inline-block bg-green-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Cadastre sua cooperativa ou empresa
          </a>
        </div>
      </div>
    </section>
  )
}