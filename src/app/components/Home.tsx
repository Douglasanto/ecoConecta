import Image from "next/image";
import ImageHome from "../assets/ImageHome.png"

export default function HomePage(){
    return(
    <section className="bg-green-300 h-[60vh] items-center py-16 text-center px-6 flex justify-around">
      <div className="">
        <Image 
        src={ImageHome}
        alt="Image"
        width={500}
        height={500}
        />
      </div>
       <div className="">
         <h2 className="text-2xl text-green-900 font-semibold mb-6">Junte-se à revolução da reciclagem inteligente</h2>
        <p className="max-w-3xl mx-auto mb-4 text-lg">
          O <strong>EcoConecta</strong> é a plataforma digital que conecta catadores, cooperativas e empresas em uma rede de apoio, valorização e comércio justo. Aqui, as negociações são mais fáceis, o processo é transparente e cada parte atua com autonomia e segurança.
        </p>
        <p className="max-w-3xl mx-auto text-lg">
          Vamos transformar a reciclagem juntos?
        </p>
       </div>
    </section>
    )
}