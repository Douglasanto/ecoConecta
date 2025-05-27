"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";

type Lote = {
  tipo: string;
  qtd: number;
  qualidade?: string;
  sujeira?: string;
  valorMin: number;
  valorMax: number;
  status: "disponivel" | "em-lance" | "arrematado";
};

type Lance = {
  lote: Lote;
  valor: number;
  status: "em-lance" | "arrematado";
  data: string;
};

export default function Empresa() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [lances, setLances] = useState<Lance[]>([]);
  const [filtroMaterial, setFiltroMaterial] = useState<string>("");
  const [loteSelecionado, setLoteSelecionado] = useState<Lote | null>(null);
  const [mostrarMeusLances, setMostrarMeusLances] = useState(false);
  const [valorLance, setValorLance] = useState("");
  const [popupLanceAberto, setPopupLanceAberto] = useState(false);
  const [popupConfirmaAberto, setPopupConfirmaAberto] = useState(false);
  const [msgConfirma, setMsgConfirma] = useState("");
  const [popupDetalhesAberto, setPopupDetalhesAberto] = useState(false);

  useEffect(() => {
    console.log("Mostrar Meus Lances mudou:", mostrarMeusLances);
  }, [mostrarMeusLances]);

  useEffect(() => {
    const lotesSalvos = localStorage.getItem("lotesEco");
    const lancesSalvos = localStorage.getItem("lancesEmpresa");

    if (lotesSalvos) setLotes(JSON.parse(lotesSalvos));
    if (lancesSalvos) setLances(JSON.parse(lancesSalvos));
  }, []);

  useEffect(() => {
    localStorage.setItem("lotesEco", JSON.stringify(lotes));
  }, [lotes]);

  useEffect(() => {
    localStorage.setItem("lancesEmpresa", JSON.stringify(lances));
  }, [lances]);

  // Filtro
  const lotesFiltrados = filtroMaterial
    ? lotes.filter((l) => l.tipo === filtroMaterial)
    : lotes;

  // Funções para abrir/fechar popups
  function abrirPopupDetalhes(lote: Lote) {
    setLoteSelecionado(lote);
    setPopupDetalhesAberto(true);
  }

  function abrirPopupLance() {
    setPopupDetalhesAberto(false);
    setPopupLanceAberto(true);
  }

  function fecharPopupLance() {
    setPopupLanceAberto(false);
    setValorLance("");
  }

  function fecharPopupConfirma() {
    setPopupConfirmaAberto(false);
  }

  function fecharPopupDetalhes() {
    setPopupDetalhesAberto(false);
  }

  function formatarParaReal(valor: string) {
    const valorNumerico = valor.replace(/\D/g, "");
    const valorEmCentavos = parseFloat(valorNumerico) / 100;

    if (isNaN(valorEmCentavos)) return "";

    return valorEmCentavos.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleDarLance(e: React.FormEvent) {
    e.preventDefault();
    if (!loteSelecionado) return;

    // Limpa valor para formato numérico, substitui vírgula por ponto
    const valorLimpo = valorLance.replace(/[^\d,]/g, "").replace(",", ".");
    const valorNum = parseFloat(valorLimpo);
    if (isNaN(valorNum)) return alert("Valor inválido");

    if (valorNum < loteSelecionado.valorMin)
      return alert("Lance abaixo do mínimo");

    const statusLance =
      valorNum >= loteSelecionado.valorMax ? "arrematado" : "em-lance";

    // Atualiza lote
    setLotes((oldLotes) =>
      oldLotes.map((l) =>
        l === loteSelecionado ? { ...l, status: statusLance } : l
      )
    );

    // Adiciona lance
    setLances((oldLances) => [
      ...oldLances,
      {
        lote: loteSelecionado,
        valor: valorNum,
        status: statusLance,
        data: new Date().toLocaleString(),
      },
    ]);

    setPopupLanceAberto(false);
    setMsgConfirma(
      statusLance === "arrematado"
        ? "Lote arrematado com sucesso!"
        : "Lance enviado!"
    );
    setPopupConfirmaAberto(true);
    setValorLance("");
  }

  // Cálculos do dashboard
  const totalGasto = lances.reduce((acc, lance) => acc + lance.valor, 0);
  const qtdArrematados = lotes.filter((l) => l.status === "arrematado").length;
  const mediaValor = lances.length > 0 ? totalGasto / lances.length : 0;
  const ultimoLance =
    lances.length > 0 ? lances[lances.length - 1].valor.toFixed(2) : "-";

  // Exportar CSV
  function exportarCSV() {
    let csv = "Lote,Valor Ofertado,Status,Data\n";
    lances.forEach((l) => {
      csv += `${l.lote.tipo} ${l.lote.qtd}kg,R$ ${l.valor.toFixed(2)},${
        l.status
      },${l.data}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meus_lances.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        mostrarMeusLances={mostrarMeusLances}
        setMostrarMeusLances={setMostrarMeusLances}
      />

      <main className="container mx-auto flex-grow p-4 space-y-6">
        {/* Meus Lances */}
        <section
          className={`meusLances border p-4 rounded shadow transition-all duration-300 ${
            mostrarMeusLances ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Meus Lances</h2>
            <button
              onClick={exportarCSV}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Exportar CSV
            </button>
          </div>

          {lances.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum lance registrado ainda
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-black">Lote</th>
                    <th className="p-3 text-right text-black">Valor</th>
                    <th className="p-3 text-center text-black">Status</th>
                    <th className="p-3 text-right text-black">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {lances.map((l, i) => (
                    <tr key={i} className="border-b ">
                      <td className="p-3">
                        {l.lote.tipo} {l.lote.qtd} kg
                      </td>
                      <td className="p-3 text-right">
                        R$ {l.valor.toFixed(2).replace(".", ",")}
                      </td>
                      <td
                        className={`p-3 text-center font-medium ${
                          l.status === "arrematado"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {l.status === "arrematado" ? "Arrematado" : "Em lance"}
                      </td>
                      <td className="p-3 text-right">{l.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        {/* Filtros */}
        <section className="filtros border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Filtros</h2>
          <div className="relative inline-block text-left">
            <label htmlFor="filtroMaterial" className="block mb-1 font-medium">
              Tipo de material:
            </label>
            <select
              id="filtroMaterial"
              className="border rounded p-2"
              value={filtroMaterial}
              onChange={(e) => setFiltroMaterial(e.target.value)}
            >
              <option value="" className="text-black">
                Todos
              </option>
              <option value="papel" className="text-black">
                Papel
              </option>
              <option value="plástico" className="text-black">
                Plástico
              </option>
              <option value="vidro" className="text-black">
                Vidro
              </option>
              <option value="metal" className="text-black">
                Metal
              </option>
            </select>
          </div>
          <button
            onClick={() => {}}
            className="btn bg-green-600 text-white ml-4 px-4 py-2 rounded hover:bg-green-700"
          >
            Filtrar
          </button>
        </section>

        {/* Dashboard */}
        <section className="dashboard border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">📊 Meu Resumo</h2>
          <p>
            <strong>Total gasto:</strong> R${" "}
            {totalGasto.toFixed(2).replace(".", ",")}
          </p>
          <p>
            <strong>Lotes arrematados:</strong> {qtdArrematados}
          </p>
          <p>
            <strong>Valor médio por lance:</strong> R${" "}
            {mediaValor.toFixed(2).replace(".", ",")}
          </p>
          <p>
            <strong>Último lance:</strong> R${ultimoLance.replace(".", ",")}
          </p>
        </section>

        {/* Lista de lotes */}
        <section className="listaLotes border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">
            Lotes Disponíveis para Lance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {lotesFiltrados.length === 0 && <p>Nenhum lote disponível.</p>}
            {lotesFiltrados.map((lote, i) => (
              <div key={i} className="border p-4 rounded shadow">
                <h4 className="font-bold">Lote {i + 1}</h4>
                <p>
                  <strong>Tipo:</strong> {lote.tipo}
                </p>
                <p>
                  <strong>Peso:</strong> {lote.qtd} kg
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      lote.status === "arrematado"
                        ? "text-green-600"
                        : lote.status === "em-lance"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {lote.status === "arrematado"
                      ? "Arrematado"
                      : lote.status === "em-lance"
                      ? "Em lance"
                      : "Disponível"}
                  </span>
                </p>
                <button
                  onClick={() => abrirPopupDetalhes(lote)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Detalhes
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Popups */}

      {/* Detalhes do lote */}
      {popupDetalhesAberto && loteSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96 max-w-full">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Detalhes do Lote
            </h3>
            <p className="text-black">
              <strong>Tipo:</strong> {loteSelecionado.tipo}
            </p>
            <p className="text-black">
              <strong>Peso:</strong> {loteSelecionado.qtd} kg
            </p>
            {loteSelecionado.qualidade && (
              <p className="text-black">
                <strong>Qualidade:</strong> {loteSelecionado.qualidade}
              </p>
            )}
            {loteSelecionado.sujeira && (
              <p className="text-black">
                <strong>Sujeira:</strong> {loteSelecionado.sujeira}
              </p>
            )}
            <p className="text-black">
              <strong>Valor mínimo:</strong> R${" "}
              {loteSelecionado.valorMin.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-black">
              <strong>Valor máximo:</strong> R${" "}
              {loteSelecionado.valorMax.toFixed(2).replace(".", ",")}
            </p>

            {loteSelecionado.status !== "arrematado" && (
              <button
                onClick={abrirPopupLance}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Dar Lance
              </button>
            )}

            <button
              onClick={fecharPopupDetalhes}
              className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Popup de dar lance */}
      {popupLanceAberto && loteSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleDarLance}
            className="bg-white p-6 rounded w-96 max-w-full"
          >
            <h3 className="text-xl font-semibold mb-4 text-black">
              Dar Lance no Lote
            </h3>
            <p className="text-black">
              Lote: {loteSelecionado.tipo} {loteSelecionado.qtd} kg
            </p>
            <label className="block mt-4 text-black">
              Valor do lance (R$):
              <input
                type="text"
                value={valorLance}
                onChange={(e) =>
                  setValorLance(formatarParaReal(e.target.value))
                }
                placeholder={`Mínimo: R$ ${loteSelecionado?.valorMin.toFixed(
                  2
                )}`}
                className="border p-2 rounded w-full mt-1"
                required
              />
            </label>
            <div className="flex justify-end mt-6 gap-3">
              <button
                type="button"
                onClick={fecharPopupLance}
                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Enviar Lance
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Popup de confirmação */}
      {popupConfirmaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-80 max-w-full text-center">
            <p className="mb-4 text-black">{msgConfirma}</p>
            <button
              onClick={fecharPopupConfirma}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
