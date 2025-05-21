"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const senha = form.senha.value;

    const userData = JSON.parse(localStorage.getItem("userCadastro") || "{}");

    if (userData.email === email && userData.senha === senha) {
      localStorage.setItem("userLogado", JSON.stringify(userData));

      if (userData.tipo === "empresa") {
        router.push("/dashboard/empresa");
      } else if (userData.tipo === "colaborador") {
        router.push("/dashboard/colaborador");
      } else {
        setErro("Tipo de usuário desconhecido.");
      }
    } else {
      setErro("Email ou senha inválidos.");
    }
  };

  return (
    <main className="bg-[#f1f8e9] min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-800">Login</h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold text-black">E-mail:</label>
            <input type="email" id="email" name="email" required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black" />
          </div>

          <div>
            <label htmlFor="senha" className="block font-bold text-black">Senha:</label>
            <input type="password" id="senha" name="senha" required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black" />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button type="submit" className="bg-green-700 text-white font-bold w-full py-2 rounded-md hover:bg-green-800 transition">Entrar</button>
          <p className="mt-6 text-center text-sm text-black">
          Não tem uma conta? <Link href="/cadastro" className="text-green-800 font-semibold">Faça o cadastro aqui</Link>
        </p>
        </form>
      </div>
    </main>
  );
}

         
