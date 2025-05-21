export default function Banner(){
    return(
         <section className="bg-green-300 py-16 text-center px-6">
        <h3 className="text-xl font-semibold text-green-900 mb-4">Vamos juntos transformar a cadeia da reciclagem!</h3>
        <p className="mb-6 text-lg">Faça seu login ou crie sua conta e faça parte da mudança!</p>
        <a href="/cadastro" className="bg-white text-green-800 px-6 py-3 rounded-lg font-bold hover:bg-green-100">Criar Conta</a>
      </section>
    )
}