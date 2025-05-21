export default function Footer(){
    return(
        <footer className="bg-gray-800 text-white py-10">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center md:text-left">
      <div>
        <h4 className="font-bold mb-2">EcoConecta</h4>
        <p>© 2025 EcoConecta. Todos os direitos reservados.</p>
      </div>
      <div>
        <h4 className="font-bold mb-2">Navegação</h4>
        <ul className="space-y-1">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#funciona" className="hover:underline">Como Funciona</a></li>
          <li><a href="#sobre" className="hover:underline">Sobre Nós</a></li>
          <li><a href="#parceiras" className="hover:underline">Empresas Parceiras</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-2">Contato</h4>
        <p>contato@ecoconecta.com.br<br/> (11) 99999-9999</p>
      </div>
    </div>
  </footer>
    )
}