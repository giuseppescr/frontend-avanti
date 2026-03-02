import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPage() {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  // Função centralizada para gerenciar o acesso às áreas restritas
  const handleAcessoRapido = (rotaDestino) => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/conhecimentos");
    } else {
      navigate(rotaDestino);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-700 select-none">
          <div className="bg-indigo-700 text-white p-1.5 rounded-lg text-xs font-black uppercase tracking-tighter">
            TC
          </div>
          Troca de Conhecimentos
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-bold text-slate-600 hover:text-indigo-700 transition cursor-pointer"
          >
            Entrar
          </Link>
          <Link
            to="/cadastro"
            className="bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-800 transition transform active:scale-95 cursor-pointer"
          >
            Criar Conta
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-linear-to-b from-indigo-50/50 to-white pt-24 pb-20 px-6 text-center grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">
            Aprenda algo novo, <br />
            <span className="text-indigo-700">ensine o que sabe.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Uma plataforma desenvolvida para conectar pessoas que desejam
            compartilhar habilidades e evoluir juntas em comunidade.
          </p>

          {/* BARRA DE BUSCA */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl shadow-indigo-100 flex flex-col md:flex-row gap-2 border border-slate-100">
            <div className="flex-1 flex items-center px-4 gap-3">
              <span className="text-slate-400 select-none">🔍</span>
              <input
                type="text"
                placeholder="Qual habilidade você busca?"
                className="w-full py-3 outline-none text-slate-700 font-medium"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <button
              onClick={() => handleAcessoRapido("/login")}
              className="bg-indigo-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Explorar
            </button>
          </div>
        </div>
      </header>

      {/* SEÇÃO DE CARDS */}
      <section className="max-w-6xl mx-auto w-full px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CARD COMPARTILHE (CREATE) */}
        <div
          onClick={() => handleAcessoRapido("/login")}
          className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition hover:border-indigo-200 cursor-pointer group"
        >
          <div className="text-3xl mb-4 transition-transform group-hover:scale-110 text-center select-none">
            💡
          </div>
          <h3 className="font-bold text-slate-800 mb-2 text-center group-hover:text-indigo-700 transition">
            Compartilhe
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed text-center">
            Cadastre suas habilidades e ajude outros desenvolvedores a
            crescerem.
          </p>
        </div>

        {/* CARD APRENDA (READ) */}
        <div
          onClick={() => handleAcessoRapido("/login")}
          className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition hover:border-indigo-200 cursor-pointer group"
        >
          <div className="text-3xl mb-4 transition-transform group-hover:scale-110 text-center select-none">
            📚
          </div>
          <h3 className="font-bold text-slate-800 mb-2 text-center group-hover:text-indigo-700 transition">
            Aprenda
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed text-center">
            Encontre mentores e parceiros de estudo para dominar novas
            tecnologias.
          </p>
        </div>

        {/* CARD PRATIQUE (CONVITE À AÇÃO / CADASTRO) */}
        <div
          onClick={() => navigate("/cadastro")}
          className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition hover:border-indigo-200 cursor-pointer group"
        >
          <div className="text-3xl mb-4 transition-transform group-hover:scale-110 text-center select-none">
            🛠️
          </div>
          <h3 className="font-bold text-slate-800 mb-2 text-center group-hover:text-indigo-700 transition">
            Pratique
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed text-center">
            Crie sua conta agora e comece a aplicar seus conhecimentos através
            da colaboração.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6 text-center">
          <div className="text-slate-400 text-sm italic select-none">
            © 2026 • Troca de Conhecimentos. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
