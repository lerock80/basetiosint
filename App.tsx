
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Shield, Settings, LogOut, Plus, Trash2, Edit3, ExternalLink, Menu, X, Globe, User, Upload, FileText, LayoutGrid, RotateCcw } from 'lucide-react';
import { Tool, Category, User as UserType, View } from './types';
import { INITIAL_CATEGORIES, INITIAL_TOOLS } from './constants';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<View>('home');
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence
  useEffect(() => {
    const savedTools = localStorage.getItem('osint_tools');
    const savedCategories = localStorage.getItem('osint_categories');
    const savedUsers = localStorage.getItem('osint_users');

    if (savedTools) setTools(JSON.parse(savedTools));
    else setTools(INITIAL_TOOLS);

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    else setCategories(INITIAL_CATEGORIES);

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else setUsers([{ id: '1', username: 'Admin', role: 'admin' }]);
  }, []);

  useEffect(() => {
    localStorage.setItem('osint_tools', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('osint_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('osint_users', JSON.stringify(users));
  }, [users]);

  // Derived state
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || tool.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, activeCategory]);

  // Auth
  const handleLogin = (u: string, p: string) => {
    if (u === 'Admin' && p === 'baseti123456') {
      setIsLoggedIn(true);
      setView('admin-panel');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  // CRUD Handlers (Tools)
  const addTool = (tool: Omit<Tool, 'id'>) => {
    const newTool = { ...tool, id: 'tool-' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 4) };
    setTools(prev => [...prev, newTool]);
  };

  const removeTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id));
  };

  // CRUD Handlers (Categories)
  const addCategory = (name: string): string => {
    const existing = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing.id;
    
    const newId = 'cat-' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 4);
    setCategories(prev => [...prev, { id: newId, name }]);
    return newId;
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    setTools(tools.filter(t => t.categoryId !== id));
  };

  const resetDatabase = () => {
    if (confirm('Deseja realmente resetar a base de dados para os valores iniciais? Todas as alterações manuais serão perdidas.')) {
      setTools(INITIAL_TOOLS);
      setCategories(INITIAL_CATEGORIES);
      alert('Base de dados restaurada com sucesso.');
    }
  };

  const clearDatabase = () => {
    if (confirm('ATENÇÃO: Deseja apagar TODAS as ferramentas e categorias cadastradas?')) {
      setTools([]);
      setCategories([]);
      alert('Base de dados limpa.');
    }
  };

  // CRUD Handlers (Users)
  const addUser = (username: string) => {
    setUsers([...users, { id: Date.now().toString(), username, role: 'user' }]);
  };

  const removeUser = (id: string) => {
    if (users.find(u => u.id === id)?.username === 'Admin') {
      alert('O usuário Admin principal não pode ser removido.');
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  };

  // Import Handler
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split('\n');
      let importedCount = 0;
      
      const newTools: Tool[] = [];
      const tempCategories = [...categories];

      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        // Skip empty lines or noise like ",,"
        if (!trimmedLine || trimmedLine === ',,' || trimmedLine === ';;') return;
        
        // Skip header
        if (trimmedLine.toLowerCase().startsWith('categoria,') || trimmedLine.toLowerCase().startsWith('categoria;')) return;

        const parts = trimmedLine.includes(';') ? trimmedLine.split(';') : trimmedLine.split(',');
        if (parts.length >= 3) {
          const catName = parts[0].trim();
          const toolName = parts[1].trim();
          const toolUrl = parts[2].trim();

          if (catName && toolName && toolUrl) {
            let catId = tempCategories.find(c => c.name.toLowerCase() === catName.toLowerCase())?.id;
            
            if (!catId) {
              catId = 'cat-' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 4);
              tempCategories.push({ id: catId, name: catName });
            }

            newTools.push({
              id: 'tool-' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 4) + index,
              categoryId: catId,
              name: toolName,
              description: 'Importado via planilha',
              url: toolUrl.startsWith('http') ? toolUrl : `https://${toolUrl}`
            });
            importedCount++;
          }
        }
      });

      if (importedCount > 0) {
        setCategories(tempCategories);
        setTools(prev => [...prev, ...newTools]);
        alert(`${importedCount} ferramentas importadas com sucesso!`);
      } else {
        alert('Nenhum dado válido encontrado. Certifique-se que o arquivo segue o formato: Categoria, Nome, Link');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-sky-900/50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="p-2 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">
              Base TI <span className="text-sky-400">- OSINT</span>
            </h1>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block -mt-1">
              Terminal de Operações
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-800">
            <LayoutGrid className="w-3 h-3 text-sky-500" />
            <span className="text-xs font-bold text-slate-300">{tools.length} Ativos</span>
          </div>
          <button onClick={() => setView('home')} className={`text-sm font-semibold hover:text-sky-400 transition ${view === 'home' ? 'text-sky-400' : 'text-slate-400'}`}>Início</button>
          {!isLoggedIn ? (
            <button 
              onClick={() => setView('admin-login')} 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition flex items-center gap-2 border border-slate-700"
            >
              <User className="w-4 h-4" /> Painel
            </button>
          ) : (
            <>
              <button onClick={() => setView('admin-panel')} className={`text-sm font-semibold hover:text-sky-400 transition ${view === 'admin-panel' ? 'text-sky-400' : 'text-slate-400'}`}>Gerenciar</button>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/95 flex flex-col items-center justify-center gap-8 text-xl">
          <div className="text-sky-400 font-bold text-sm mb-4">{tools.length} ferramentas cadastradas</div>
          <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}>Início</button>
          {!isLoggedIn ? (
            <button onClick={() => { setView('admin-login'); setIsMobileMenuOpen(false); }}>Painel Administrativo</button>
          ) : (
            <button onClick={() => { setView('admin-panel'); setIsMobileMenuOpen(false); }}>Gerenciar Base</button>
          )}
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-sky-500 rounded-full text-white shadow-xl shadow-sky-500/20"><X /></button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12">
        {view === 'home' && (
          <>
            {/* Hero */}
            <section className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full mb-6">
                <Shield className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-sky-400 tracking-widest uppercase">Base de Dados Unificada: {tools.length} Ferramentas</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 neon-text tracking-tighter">
                OSINT <span className="text-sky-500">Analytics</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 uppercase tracking-[0.2em] font-light">
                Inteligência de Fontes Abertas & Contexto Brasileiro
              </p>
              
              {/* Search */}
              <div className="max-w-2xl mx-auto relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Busque por termos, órgãos, siglas ou links..."
                  className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition shadow-2xl backdrop-blur-sm text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </section>

            {/* Content Body */}
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Categories Sidebar */}
              <aside className="lg:w-72 flex-shrink-0">
                <div className="sticky top-28">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 border-l-2 border-sky-500 pl-3">
                    <Globe className="w-4 h-4" /> Categorias
                  </h3>
                  <div className="flex flex-wrap lg:flex-col gap-2.5 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-sky-900">
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all border ${activeCategory === 'all' ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20' : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span>Todas as ferramentas</span>
                        <span className="text-[10px] opacity-60 bg-white/10 px-1.5 rounded">{tools.length}</span>
                      </div>
                    </button>
                    {categories.map(cat => {
                      const count = tools.filter(t => t.categoryId === cat.id).length;
                      return (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all border ${activeCategory === cat.id ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20' : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{cat.name}</span>
                            <span className="text-[10px] opacity-60 bg-white/10 px-1.5 rounded">{count}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* Tools Grid */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium">Resultados: <span className="text-white font-bold">{filteredTools.length}</span></span>
                  {activeCategory !== 'all' && (
                    <button onClick={() => setActiveCategory('all')} className="text-sky-500 text-xs font-bold uppercase hover:underline">Limpar Categoria</button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTools.map(tool => (
                    <div key={tool.id} className="glass p-6 rounded-2xl flex flex-col group hover:border-sky-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-sky-950/50 text-sky-400 rounded-lg border border-sky-500/20 uppercase tracking-widest truncate max-w-[150px]">
                          {categories.find(c => c.id === tool.categoryId)?.name || 'Outros'}
                        </span>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-sky-500 transition-colors group/link border border-slate-700">
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover/link:text-white" />
                        </a>
                      </div>
                      <h4 className="text-lg font-bold mb-2 group-hover:text-sky-400 transition-colors">{tool.name}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed mb-8 flex-1 line-clamp-3">{tool.description}</p>
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full text-center py-2.5 bg-slate-800/50 hover:bg-sky-500 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-slate-700 hover:border-sky-400"
                      >
                        Abrir Ferramenta
                      </a>
                    </div>
                  ))}
                </div>
                {filteredTools.length === 0 && (
                  <div className="text-center py-24 bg-slate-900/10 rounded-[3rem] border border-dashed border-slate-800 flex flex-col items-center">
                    <div className="p-4 bg-slate-900 rounded-full mb-4">
                      <Search className="w-8 h-8 text-slate-700" />
                    </div>
                    <p className="text-slate-500 font-medium">Nenhum dado encontrado para sua busca.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {view === 'admin-login' && (
          <div className="max-w-md mx-auto py-20">
            <div className="glass p-10 rounded-[2.5rem] shadow-2xl border border-sky-500/10">
              <div className="text-center mb-10 relative">
                <div className="p-4 bg-sky-500/10 rounded-3xl w-fit mx-auto mb-6 border border-sky-500/20">
                  <Shield className="w-12 h-12 text-sky-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Login Administrativo</h2>
                <p className="text-slate-400 text-sm">Gerencie a base de ferramentas OSINT</p>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const u = (e.currentTarget.elements.namedItem('user') as HTMLInputElement).value;
                const p = (e.currentTarget.elements.namedItem('pass') as HTMLInputElement).value;
                handleLogin(u, p);
              }}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Usuário</label>
                    <input name="user" type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-sky-500/50 outline-none transition text-white" placeholder="Admin" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Senha</label>
                    <input name="pass" type="password" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-sky-500/50 outline-none transition text-white" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-sky-500/20 transition-all">
                    Entrar no Sistema
                  </button>
                  <button type="button" onClick={() => setView('home')} className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition py-2">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {view === 'admin-panel' && (
          <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tighter">Gestão de <span className="text-sky-500">Dados</span></h2>
                <p className="text-slate-400 mt-1">Total de registros: <span className="text-white font-bold">{tools.length}</span></p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <input type="file" ref={fileInputRef} onChange={handleImport} accept=".csv,.txt" className="hidden" />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-emerald-500"
                >
                  <Upload className="w-4 h-4" /> Importar Planilha
                </button>
                <button 
                  onClick={resetDatabase}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4" /> Resetar
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-slate-700">
                  <LogOut className="w-4 h-4" /> Sair
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Categories Management */}
              <section className="glass p-8 rounded-[2rem]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Globe className="w-5 h-5 text-sky-400" /> Categorias</h3>
                  <button 
                    onClick={() => {
                      const name = prompt('Nome da nova categoria:');
                      if (name) addCategory(name);
                    }}
                    className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl hover:bg-sky-500 transition-all hover:text-white border border-sky-500/20"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-slate-900/30 p-4 rounded-2xl flex items-center justify-between border border-slate-800">
                      <div className="truncate pr-2">
                         <span className="font-bold text-sm block truncate">{cat.name}</span>
                         <span className="text-[10px] text-slate-600 font-bold">{tools.filter(t => t.categoryId === cat.id).length} itens</span>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => {
                          const name = prompt('Novo nome:', cat.name);
                          if (name) setCategories(categories.map(c => c.id === cat.id ? { ...c, name } : c));
                        }} className="p-2 text-slate-500 hover:text-sky-400 transition-colors"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => removeCategory(cat.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tools Management */}
              <section className="glass p-8 rounded-[2rem] xl:col-span-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Settings className="w-5 h-5 text-sky-400" /> Inventário de Ativos</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={clearDatabase}
                      className="bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                    >
                      Apagar Tudo
                    </button>
                    <button 
                      onClick={() => {
                        const name = prompt('Nome da ferramenta:');
                        const desc = prompt('Descrição:');
                        const url = prompt('URL:');
                        const catId = prompt('ID da Categoria (' + categories.map(c => `${c.id}=${c.name}`).join(', ') + '):');
                        if (name && desc && url && catId) addTool({ name, description: desc, url, categoryId: catId });
                      }}
                      className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-sky-500/20 transition-all"
                    >
                      <Plus className="w-5 h-5" /> Adicionar Manualmente
                    </button>
                  </div>
                </div>
                
                <div className="bg-sky-500/5 border border-sky-500/20 p-4 rounded-2xl mb-8 flex items-center gap-4">
                   <div className="bg-sky-500/10 p-2.5 rounded-xl">
                      <FileText className="w-6 h-6 text-sky-400" />
                   </div>
                   <div className="text-sm">
                      <span className="text-sky-400 font-bold block">Modelo de Tabela (CSV):</span>
                      <p className="text-slate-400 text-xs italic">A planilha deve conter 3 colunas: <code className="text-white px-1 bg-slate-900 rounded">Categoria</code>, <code className="text-white px-1 bg-slate-900 rounded">Nome</code>, <code className="text-white px-1 bg-slate-900 rounded">Link</code>.</p>
                   </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <th className="pb-4">Recurso</th>
                        <th className="pb-4">Categoria</th>
                        <th className="pb-4 hidden md:table-cell">URL / Endereço</th>
                        <th className="pb-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tools.slice().reverse().map(tool => (
                        <tr key={tool.id} className="border-b border-slate-900 last:border-0 hover:bg-slate-900/30 group transition-all">
                          <td className="py-5">
                            <div className="font-bold text-sm text-white">{tool.name}</div>
                            <div className="text-[11px] text-slate-500 max-w-sm truncate">{tool.description}</div>
                          </td>
                          <td className="py-5">
                            <span className="text-[10px] font-black px-2 py-1 bg-slate-900 text-slate-500 border border-slate-800 rounded-lg uppercase">
                              {categories.find(c => c.id === tool.categoryId)?.name || 'Outros'}
                            </span>
                          </td>
                          <td className="py-5 hidden md:table-cell text-xs text-sky-600 truncate max-w-[200px] font-medium">
                            {tool.url}
                          </td>
                          <td className="py-5 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => {
                                const name = prompt('Novo nome:', tool.name);
                                const desc = prompt('Nova descrição:', tool.description);
                                if (name && desc) setTools(tools.map(t => t.id === tool.id ? { ...t, name, description: desc } : t));
                              }} className="p-2.5 text-slate-500 hover:text-sky-400 hover:bg-sky-900/20 rounded-xl transition-all">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => removeTool(tool.id)} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-900/50 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
           <Shield className="w-5 h-5 text-sky-500/40" />
           <span className="text-xl font-black text-slate-800 uppercase tracking-[0.3em]">Base TI OSINT</span>
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2024 Base de Conhecimento Centralizada. Itens Ativos: {tools.length}</p>
      </footer>
    </div>
  );
};

export default App;
