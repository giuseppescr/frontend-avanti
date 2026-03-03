import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Pega a URL da API do .env ou usa o localhost como padrão
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const resposta = await axios.post(`${API}/login`, {
        email,
        senha,
      });

      localStorage.setItem("token", resposta.data.token);
      navigate("/conhecimentos");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Não foi possível conectar ao servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 w-full max-w-md relative">
        {/* Botão Voltar*/}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-slate-400 hover:text-indigo-700 transition-colors flex items-center gap-1 text-sm font-medium cursor-pointer"
        >
          <span>←</span> Voltar
        </button>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-2 mt-4">
          Bem-vindo
        </h2>
        <p className="text-slate-500 text-center mb-8 text-sm text-balance">
          Entre para continuar trocando conhecimentos.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1 text-left">
              E-mail
            </label>
            <input
              type="email"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1 text-left">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
              placeholder="••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
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
            className={`w-full py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition transform active:scale-[0.98] cursor-pointer mt-4 ${
              loading
                ? "bg-indigo-400"
                : "bg-indigo-700 hover:bg-indigo-800 text-white"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            className="text-indigo-700 font-bold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
