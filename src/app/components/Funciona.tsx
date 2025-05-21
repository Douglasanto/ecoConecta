export default function Funciona(){
    return(
          <section id="funciona" className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <h3 className="text-2xl font-bold mb-10 text-center">Como Funciona</h3>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl mb-2">📝</div>
          <h4 className="font-bold mb-2">Cadastro de cooperativas e empresas</h4>
          <p>Todos se inscrevem de forma simples e segura.</p>
        </div>
        <div>
          <div className="text-4xl mb-2">🔗</div>
          <h4 className="font-bold mb-2">Conexão entre as partes</h4>
          <p>Negociações diretas e transparentes via plataforma.</p>
        </div>
        <div>
          <div className="text-4xl mb-2">📦</div>
          <h4 className="font-bold mb-2">Comércio justo de recicláveis</h4>
          <p>Valorização do trabalho e materiais com segurança.</p>
        </div>
      </div>
      <div className="text-center mt-10">
        <a href="/cadastro" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">Cadastre sua cooperativa ou empresa</a>
      </div>
    </div>
  </section>
    )
}