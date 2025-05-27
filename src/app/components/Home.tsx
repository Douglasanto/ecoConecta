import Image from "next/image";
import ImageHome from "../assets/ImageHome.png"

export default function HomePage(){
    return(
        <section className="bg-green-300 min-h-[60vh] items-center py-8 md:py-16 text-center px-4 md:px-6 flex flex-col lg:flex-row justify-around">
            {/* Imagem - Ordem muda em mobile */}
            <div className="order-2 lg:order-1 mt-8 lg:mt-0 w-full lg:w-auto">
                <Image 
                    src={ImageHome}
                    alt="Image"
                    width={500}
                    height={500}
                    className="w-full max-w-md mx-auto lg:w-auto"
                />
            </div>
            
            {/* Texto - Ordem muda em mobile */}
            <div className="order-1 lg:order-2 w-full lg:w-auto max-w-3xl lg:max-w-2xl px-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl text-green-900 font-semibold mb-4 md:mb-6">
                    Junte-se à revolução da reciclagem inteligente
                </h2>
                <p className="mb-3 md:mb-4 text-base md:text-lg">
                    O <strong>EcoConecta</strong> é a plataforma digital que conecta catadores, cooperativas e empresas em uma rede de apoio, valorização e comércio justo. Aqui, as negociações são mais fáceis, o processo é transparente e cada parte atua com autonomia e segurança.
                </p>
                <p className="text-base md:text-lg">
                    Vamos transformar a reciclagem juntos?
                </p>
            </div>
        </section>
    )
}