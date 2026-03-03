import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConhecimentosPage() {
  const [conhecimentos, setConhecimentos] = useState([]);
  const [novoConhecimento, setNovoConhecimento] = useState({
    titulo: "",
    categoria: "",
    nivel: "Iniciante",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const token = localStorage.getItem("token");

  const fetchConhecimentos = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/conhecimentos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConhecimentos(res.data);
    } catch (err) {
      console.error("Erro ao buscar conhecimentos", err);
    }
  }, [API, token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchConhecimentos();
  }, [token, navigate, fetchConhecimentos]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/conhecimentos`, novoConhecimento, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNovoConhecimento({
        titulo: "",
        categoria: "",
        nivel: "Iniciante",
        descricao: "",
      });
      fetchConhecimentos();
    } catch (err) {
      console.error("Erro técnico ao publicar:", err);
      alert("Erro ao publicar conhecimento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header Padronizado */}
      <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Ofertas de Conhecimento
          </h1>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-indigo-700 transition-colors text-sm font-bold cursor-pointer"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Card de Publicação */}
        <section className="bg-white p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 mb-12">
          <h2 className="text-lg font-bold text-slate-800 mb-6 px-1">
            Compartilhe um conhecimento
          </h2>
          <form
            onSubmit={handlePublicar}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm placeholder:text-slate-400"
              placeholder="Título (ex: Aulas de React)"
              value={novoConhecimento.titulo}
              onChange={(e) =>
                setNovoConhecimento({
                  ...novoConhecimento,
                  titulo: e.target.value,
                })
              }
              required
            />
            <input
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm placeholder:text-slate-400"
              placeholder="Categoria (ex: Programação)"
              value={novoConhecimento.categoria}
              onChange={(e) =>
                setNovoConhecimento({
                  ...novoConhecimento,
                  categoria: e.target.value,
                })
              }
              required
            />
            <select
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm cursor-pointer text-slate-600"
              value={novoConhecimento.nivel}
              onChange={(e) =>
                setNovoConhecimento({
                  ...novoConhecimento,
                  nivel: e.target.value,
                })
              }
            >
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition transform active:scale-[0.98] cursor-pointer"
            >
              {loading ? "Publicando..." : "Publicar"}
            </button>

            <textarea
              className="md:col-span-4 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm resize-none h-24 placeholder:text-slate-400"
              placeholder="Descrição rápida sobre o que você quer ensinar..."
              value={novoConhecimento.descricao}
              onChange={(e) =>
                setNovoConhecimento({
                  ...novoConhecimento,
                  descricao: e.target.value,
                })
              }
              required
            />
          </form>
        </section>

        {/* Listagem de Conhecimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conhecimentos.length > 0 ? (
            conhecimentos.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all border-l-4 border-l-indigo-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">
                    {item.categoria}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {item.nivel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {item.titulo}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.descricao}
                </p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                    Ofertado por:{" "}
                    <span className="text-slate-600 font-bold">
                      {item.pessoa?.nome || "Membro"}
                    </span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">
                Nenhum conhecimento cadastrado ainda. Seja o primeiro! ✨
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
