"use client";
import { useEffect, useState } from "react";

type User = {
  name: string;
  tipo: "empresa" | "colaborador";
};

type HeaderProps = {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  mostrarMeusLances?: boolean;
  setMostrarMeusLances?: (value: boolean) => void;
};

export default function Header({
  activeTab,
  setActiveTab,
  mostrarMeusLances,
  setMostrarMeusLances,
}: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogado");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao parsear user do localStorage:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <header className="bg-green-800 text-white py-5">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">♻️ EcoConecta</h1>
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="#sobre" className="hover:text-green-200 transition">
              Sobre Nós
            </a>
            <a href="#funciona" className="hover:text-green-200 transition">
              Como Funciona
            </a>
            <a href="#parceiras" className="hover:text-green-200 transition">
              Empresas Parceiras
            </a>
            <a
              href="/login"
              className="bg-white text-green-800 px-4 py-2 rounded-lg font-bold hover:bg-green-100 ml-4"
            >
              Login
            </a>
          </nav>
        </div>
      </header>
    );
  }

  if (user.tipo === "colaborador") {
    return (
      <header className="bg-green-800 text-white py-5">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div>
            <h1 className="text-xl font-bold">♻️ EcoConecta</h1>
          </div>
          <div>
            <button
              onClick={() => setActiveTab?.("lancar")}
              className={`px-4 py-2 rounded ${
                activeTab === "lancar"
                  ? "bg-blue-600 text-white"
                  : "bg-green-700"
              }`}
            >
              Lançar lote
            </button>
            <button
              onClick={() => setActiveTab?.("visualizar")}
              className={`px-4 py-2 rounded ${
                activeTab === "visualizar"
                  ? "bg-blue-600 text-white"
                  : "bg-green-700"
              }`}
            >
              Visualizar lotes
            </button>
            <button
              onClick={() => setActiveTab?.("historico")}
              className={`px-4 py-2 rounded ${
                activeTab === "historico"
                  ? "bg-blue-600 text-white"
                  : "bg-green-700"
              }`}
            >
              Histórico
            </button>
          </div>
          <div>
            <span className="font-semibold">
              Olá, {user.nome.split(" ")[0]}
            </span>
            <a
              href="/logout"
              className="text-white font-semibold ml-6 hover:underline"
            >
              Sair
            </a>
          </div>
        </div>
      </header>
    );
  }

  if (user.tipo === "empresa") {
    return (
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">♻️ EcoConecta</h1>
          <nav className="space-x-4 flex items-center">
            <button
              onClick={() => {
                if (setMostrarMeusLances) {
                  setMostrarMeusLances(!mostrarMeusLances);
                  console.log("Mostrar Meus Lances:", !mostrarMeusLances); // Para debug
                }
              }}
              className="btn bg-green-700 px-3 py-1 rounded hover:bg-green-800"
            >
              Meus Lances
            </button>
            <span className="font-semibold">
              Olá, {user.nome.split(" ")[0]}
            </span>
            <a
              href="/logout"
              className="text-white font-semibold hover:underline"
            >
              Sair
            </a>
          </nav>
        </div>
      </header>
    );
  }

  return null;
}
