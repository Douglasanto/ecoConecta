"use client";

import { useEffect, useState } from "react";

type Empresa = {
  id: string;
  nome: string;
  email: string;
  logo?: string;
  tipo: "empresa";
};

export default function Empresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // 1. Obter dados do localStorage com verificação de tipo
      const usuariosJSON = localStorage.getItem("usuarios");
      
      // 2. Tratar caso não exista ou seja inválido
      if (!usuariosJSON) {
        setEmpresas([]);
        setLoading(false);
        return;
      }

      // 3. Fazer parse seguro
      const usuarios: unknown = JSON.parse(usuariosJSON);

      // 4. Validar a estrutura dos dados
     (user: unknown): user is Empresa => {
  return (
    typeof user === "object" &&
    user !== null &&
    "tipo" in user &&
    (user as { tipo?: string }).tipo === "empresa"
  );
};
    } catch (error) {
      console.error("Erro ao carregar empresas:", error);
      setEmpresas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-32 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <section id="parceiras" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-10">Empresas Parceiras</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {empresas.length > 0 ? (
            empresas.map((empresa) => (
              <div 
                key={empresa.id} 
                className="bg-gray-100 p-6 rounded shadow flex flex-col items-center justify-center"
              >
                {empresa.logo ? (
                  <img 
                    src={empresa.logo} 
                    alt={`Logo ${empresa.nome}`} 
                    className="h-16 object-contain"
                  />
                ) : (
                  <div className="h-16 flex items-center justify-center text-gray-500">
                    {empresa.nome}
                  </div>
                )}
                <span className="mt-2 text-sm font-medium">
                  {empresa.nome}
                </span>
              </div>
            ))
          ) : (
            [1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="bg-gray-100 p-6 rounded shadow flex items-center justify-center h-32"
              >
                <span className="text-gray-400">Logo {item}</span>
              </div>
            ))
          )}
        </div>

        <p className="mb-6">Sua empresa também pode fazer parte da mudança.</p>
        <a 
          href="/cadastro" 
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 inline-block"
        >
          Quero ser parceiro
        </a>
      </div>
    </section>
  );
}