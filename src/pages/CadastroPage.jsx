import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await axios.post(`${API}/pessoas`, {
        nome,
        email,
        telefone,
        descricao,
        senha,
      });

      alert("Cadastro realizado com sucesso! 🎉");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.error || "Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 w-full max-w-lg relative">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-slate-400 hover:text-indigo-700 transition-colors flex items-center gap-1 text-sm font-medium cursor-pointer"
        >
          <span>←</span> Voltar
        </button>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-2 mt-4">
          Criar uma Conta
        </h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Junte-se à nossa comunidade de troca de conhecimentos.
        </p>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1 px-1">
                Nome Completo
              </label>
              <input
                type="text"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 text-sm"
                placeholder="Ex: Marcos Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 px-1">
                E-mail
              </label>
              <input
                type="email"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 text-sm"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 px-1">
                Telefone
              </label>
              <input
                type="text"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 text-sm"
                placeholder="(83) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 px-1">
              Sua Senha
            </label>
            <input
              type="password"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 text-sm"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 px-1">
              Descrição (Opcional)
            </label>
            <textarea
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 text-sm resize-none h-24"
              placeholder="Conte um pouco sobre suas habilidades..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          {erro && (
            <div className="bg-red-50 text-red-600 text-xs py-3 rounded-lg text-center font-medium border border-red-100">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition transform active:scale-[0.98] cursor-pointer mt-2 text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-700 hover:bg-indigo-800"
            }`}
          >
            {loading ? "Cadastrando..." : "Finalizar Cadastro"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-indigo-700 font-bold hover:underline"
          >
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}
