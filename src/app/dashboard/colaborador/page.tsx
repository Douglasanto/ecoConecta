"use client";

import Header from "@/app/components/Header";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

type LoteStatus = "em-espera" | "em-confirmacao" | "arrematado";

interface Lote {
  id: number;
  nome: string;
  tipo: string;
  qtd: number;
  sujeira: number;
  valorMin: number;
  valorMax: number;
  status: LoteStatus;
}

interface FormData {
  nome: string;
  tipo: string;
  qtd: number;
  sujeira: number;
  valorMin: string;
  valorMax: string;
}

export default function Leilao() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [activeTab, setActiveTab] = useState<"lancar" | "visualizar" | "historico">("lancar");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [mostrarMeusLances, setMostrarMeusLances] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipo: "",
    qtd: 0,
    sujeira: 0,
    valorMin: "",
    valorMax: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("lotesEco");
    if (stored) {
      setLotes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lotesEco", JSON.stringify(lotes));
  }, [lotes]);

  function formatCurrencyInput(value: string): string {
    // Remove todos os caracteres não numéricos
    let cleanValue = value.replace(/\D/g, '');
    
    // Adiciona zeros à esquerda para garantir pelo menos 3 dígitos
    cleanValue = cleanValue.padStart(3, '0');
    
    // Formata como moeda (R$ 0,00)
    const formattedValue = 
      (Number(cleanValue.slice(0, -2)) + 
      Number(cleanValue.slice(-2)) / 100)
      .toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    
    return formattedValue;
  }

  function parseCurrency(value: string): number {
    return Number(value.replace(/\./g, '').replace(',', '.'));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === 'tipo') {
      setFormData(prev => ({ ...prev, [name]: value }));
      return;
    }

    if (name === 'qtd' || name === 'sujeira') {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
      return;
    }

    if (name === 'valorMin' || name === 'valorMax') {
      const formattedValue = formatCurrencyInput(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Converter valorMin e valorMax para number
    const valorMinNum = parseCurrency(formData.valorMin);
    const valorMaxNum = parseCurrency(formData.valorMax);

    if (!formData.nome || !formData.tipo || formData.qtd <= 0 || 
        formData.sujeira < 0 || valorMinNum <= 0 || valorMaxNum <= 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    if (valorMaxNum < valorMinNum) {
      alert('O valor arrematável deve ser maior ou igual ao valor mínimo');
      return;
    }

    const novoLote: Lote = {
      id: Date.now(),
      nome: formData.nome,
      tipo: formData.tipo,
      qtd: formData.qtd,
      sujeira: formData.sujeira,
      valorMin: valorMinNum,
      valorMax: valorMaxNum,
      status: 'em-espera',
    };

    setLotes((prev) => [...prev, novoLote]);
    setFormData({
      nome: "",
      tipo: "",
      qtd: 0,
      sujeira: 0,
      valorMin: "",
      valorMax: "",
    });
    setShowPopup(true);
  }

  function renderLotesPorStatus(status: LoteStatus) {
    const filtered = lotes.filter((lote) => lote.status === status);
    if (filtered.length === 0) {
      return <p className="text-gray-500">Nenhum lote nesta categoria.</p>;
    }

    return (
      <ul>
        {filtered.map((lote) => (
          <li key={lote.id} className="mb-3 border p-3 rounded">
            <strong>{lote.nome}</strong> ({lote.tipo}) - Qtde: {lote.qtd} - Sujeira:{" "}
            {lote.sujeira}%<br />
            Valor mínimo:{" "}
            {lote.valorMin.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <br />
            Valor arrematável:{" "}
            {lote.valorMax.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <br />
            {status === "em-confirmacao" && (
              <button
                onClick={() => aceitarLance(lote.id)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Aceitar lance
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }

  function aceitarLance(id: number) {
    setLotes((prev) =>
      prev.map((lote) =>
        lote.id === id ? { ...lote, status: "arrematado" } : lote
      )
    );
  }

  return (
    <>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mostrarMeusLances={mostrarMeusLances}
        setMostrarMeusLances={setMostrarMeusLances}
      />
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        <main>
          {activeTab === "lancar" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Lançar novo lote</h2>
              <form onSubmit={handleSubmit} className="max-w-md">
                <label className="block mb-2">
                  Nome do lote:
                  <input
                    type="text"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </label>

                <label className="block mb-2">
                  Tipo de material:
                  <select
                    name="tipo"
                    required
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  >
                    <option value="" className="text-black">Selecione...</option>
                    <option value="papel" className="text-black">Papel</option>
                    <option value="plástico" className="text-black">Plástico</option>
                    <option value="vidro" className="text-black">Vidro</option>
                    <option value="metal" className="text-black">Metal</option>
                  </select>
                </label>

                <label className="block mb-2">
                  Quantidade:
                  <input
                    type="number"
                    min={1}
                    name="qtd"
                    required
                    value={formData.qtd}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </label>

                <label className="block mb-2">
                  % de sujeira:
                  <input
                    type="number"
                    min={0}
                    max={100}
                    name="sujeira"
                    required
                    value={formData.sujeira}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </label>

                <label className="block mb-2">
                  Valor mínimo (R$):
                  <input
                    type="text"
                    name="valorMin"
                    required
                    value={formData.valorMin}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </label>

                <label className="block mb-4">
                  Valor arrematável (R$):
                  <input
                    type="text"
                    name="valorMax"
                    required
                    value={formData.valorMax}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </label>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Lançar
                </button>
              </form>
            </div>
          )}

          {activeTab === "visualizar" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Em espera</h3>
                {renderLotesPorStatus("em-espera")}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Em confirmação</h3>
                {renderLotesPorStatus("em-confirmacao")}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Arrematados</h3>
                {renderLotesPorStatus("arrematado")}
              </div>
            </div>
          )}

          {activeTab === "historico" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Histórico</h2>
              <p>Funcionalidade em desenvolvimento.</p>
            </div>
          )}
        </main>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
              <p className="mb-4 text-green-600 font-semibold">
                ✔️ Lote lançado com sucesso!
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}