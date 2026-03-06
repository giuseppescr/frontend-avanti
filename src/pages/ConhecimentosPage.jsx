import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ConhecimentosPage() {
  const [conhecimentos, setConhecimentos] = useState([]);
  const [novoConhecimento, setNovoConhecimento] = useState({
    titulo: "",
    categoria: "",
    nivel: "Iniciante",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [usuarioLogadoId, setUsuarioLogadoId] = useState(null);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const token = localStorage.getItem("token");

  // Descobre quem é o usuário logado lendo o Token
  useEffect(() => {
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUsuarioLogadoId(payload.id);
      } catch (error) {
        console.error("Token inválido", error);
      }
    }
  }, [token]);

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

  // Função Única para Criar ou Editar!
  const handlePublicar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editandoId) {
        // Se tem um ID no estado, significa que estamos Atualizando (PUT)
        await axios.put(`${API}/conhecimentos/${editandoId}`, novoConhecimento, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Oferta atualizada com sucesso!");
      } else {
        // Se não tem ID, estamos Criando (POST)
        await axios.post(`${API}/conhecimentos`, novoConhecimento, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Limpa tudo depois de salvar
      setNovoConhecimento({ titulo: "", categoria: "", nivel: "Iniciante", descricao: "" });
      setEditandoId(null);
      fetchConhecimentos();
    } catch (err) {
      console.error("Erro técnico ao salvar:", err);
      alert("Erro ao salvar conhecimento.");
    } finally {
      setLoading(false);
    }
  };

  // Prepara o formulário com os dados do card clicado
  const handleEditClick = (item) => {
    setNovoConhecimento({
      titulo: item.titulo,
      categoria: item.categoria,
      nivel: item.nivel,
      descricao: item.descricao,
    });
    setEditandoId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sobe a página pro formulário
  };

  // Função para Deletar
  const handleDelete = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja apagar esta oferta?");
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/conhecimentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchConhecimentos();
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao excluir oferta. Você só pode excluir as que você criou.");
    }
  };

  // Função para cancelar a edição
  const cancelarEdicao = () => {
    setNovoConhecimento({ titulo: "", categoria: "", nivel: "Iniciante", descricao: "" });
    setEditandoId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Ofertas de Conhecimento
          </h1>
          <button onClick={handleLogout} className="text-slate-400 hover:text-indigo-700 transition-colors text-sm font-bold cursor-pointer">
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className={`bg-white p-8 rounded-3xl shadow-2xl shadow-indigo-100 border mb-12 transition-all ${editandoId ? 'border-amber-300' : 'border-slate-100'}`}>
          <div className="flex justify-between items-center mb-6 px-1">
            <h2 className="text-lg font-bold text-slate-800">
              {editandoId ? "✏️ Editando sua oferta" : "Compartilhe um conhecimento"}
            </h2>
            {editandoId && (
              <button onClick={cancelarEdicao} className="text-sm font-bold text-slate-400 hover:text-red-500">
                Cancelar Edição
              </button>
            )}
          </div>

          <form onSubmit={handlePublicar} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm placeholder:text-slate-400" placeholder="Título (ex: Aulas de React)" value={novoConhecimento.titulo} onChange={(e) => setNovoConhecimento({ ...novoConhecimento, titulo: e.target.value })} required />
            <input className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm placeholder:text-slate-400" placeholder="Categoria (ex: Programação)" value={novoConhecimento.categoria} onChange={(e) => setNovoConhecimento({ ...novoConhecimento, categoria: e.target.value })} required />
            <select className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm cursor-pointer text-slate-600" value={novoConhecimento.nivel} onChange={(e) => setNovoConhecimento({ ...novoConhecimento, nivel: e.target.value })}>
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>

            <button type="submit" disabled={loading} className={`text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-[0.98] cursor-pointer ${editandoId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-indigo-700 hover:bg-indigo-800 shadow-indigo-200'}`}>
              {loading ? "Salvando..." : editandoId ? "Salvar Alterações" : "Publicar"}
            </button>

            <textarea className="md:col-span-4 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm resize-none h-24 placeholder:text-slate-400" placeholder="Descrição rápida sobre o que você quer ensinar..." value={novoConhecimento.descricao} onChange={(e) => setNovoConhecimento({ ...novoConhecimento, descricao: e.target.value })} required />
          </form>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conhecimentos.length > 0 ? (
            conhecimentos.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all border-l-4 border-l-indigo-700 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">{item.categoria}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.nivel}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.titulo}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">{item.descricao}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                    Ofertado por: <span className="text-slate-600 font-bold">{item.pessoa?.nome || "Membro"}</span>
                  </span>
                  
                  {/* Se o ID do criador da oferta for igual ao ID do usuário logado, mostra os botões! */}
                  {item.pessoaId === usuarioLogadoId && (
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(item)} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors" title="Editar Oferta">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Excluir Oferta">
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">Nenhum conhecimento cadastrado ainda. Seja o primeiro! ✨</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}