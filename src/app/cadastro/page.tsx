"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = {
      nome: form.nome.value,
      cpfcnpj: form.cpfcnpj.value,
      email: form.email.value,
      senha: form.senha.value,
      telefone: form.telefone.value,
      idade: form.idade.value,
      tipo: form.tipo.value,
      logo:
        (form.querySelector('[name="logo"]') as HTMLInputElement)?.value || "",
    };

    // Salvar no localStorage
    localStorage.setItem("userCadastro", JSON.stringify(data));

    setShowPopup(true);
    form.reset(); // limpa os campos após salvar
  };

  return (
    <main className="bg-[#f1f8e9] min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-800">
          Cadastro
        </h2>
        <form
          id="formCadastro"
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="nome" className="block font-bold text-black">
              Nome completo ou Razão Social:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="cpfcnpj" className="block font-bold text-black">
              CPF ou CNPJ:
            </label>
            <input
              type="text"
              id="cpfcnpj"
              name="cpfcnpj"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-bold text-black">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block font-bold text-black">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="telefone" className="block font-bold text-black">
              Número de Contato:
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="idade" className="block font-bold text-black">
              Idade:
            </label>
            <input
              type="number"
              id="idade"
              name="idade"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block font-bold text-black">
              Tipo de usuário:
            </label>
            <select
              id="tipo"
              name="tipo"
              required
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Selecione...</option>
              <option value="empresa">Empresa</option>
              <option value="colaborador">Colaborador</option>
            </select>
          </div>
          {tipoUsuario === "empresa" && (
            <label className="block mb-2 mt-4">
              <span className="block font-bold text-black">
                Logo da empresa:
              </span>
              <input
                type="url"
                name="logo"
                className="w-full border rounded px-3 py-2 mt-1 text-black"
                placeholder="https://exemplo.com/logo.png"
              />
            </label>
          )}
          <button
            type="submit"
            className="bg-green-700 text-white font-bold w-full py-2 rounded-md hover:bg-green-800 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-green-800 font-semibold">
            Faça login aqui
          </Link>
        </p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md text-center">
            <h3 className="text-xl font-bold mb-2 text-black">
              Cadastro realizado com sucesso!
            </h3>
            <p className="mb-4 text-black">
              Você já pode fazer login com seus dados.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
