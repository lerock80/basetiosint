
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Shield, Settings, LogOut, Plus, Trash2, Edit3, ExternalLink, Menu, X, Globe, User, Upload, FileText, LayoutGrid, RotateCcw, Filter, Key, Users, UserPlus, Lock } from 'lucide-react';
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
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
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
    else setUsers([{ id: '1', username: 'Admin', password: 'baseti123456', role: 'admin' }]);
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
    const foundUser = users.find(usr => usr.username === u && usr.password === p);
    if (foundUser) {
      setIsLoggedIn(true);
      setCurrentUser(foundUser);
      setView('admin-panel');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
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
    if (confirm('Atenção: Remover esta categoria excluirá também todas as ferramentas associadas a ela. Continuar?')) {
      setCategories(categories.filter(c => c.id !== id));
      setTools(tools.filter(t => t.categoryId !== id));
    }
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
  const addUser = (username: string, p: string, role: 'admin' | 'user') => {
    if (users.find(u => u.username === username)) {
      alert('Nome de usuário já existe!');
      return;
    }
    setUsers([...users, { id: Date.now().toString(), username, password: p, role }]);
    alert('Usuário criado com sucesso!');
  };

  const removeUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user?.username === 'Admin') {
      alert('O usuário Admin principal não pode ser removido.');
      return;
    }
    if (user?.id === currentUser?.id) {
      alert('Você não pode remover a si mesmo enquanto estiver logado.');
      return;
    }
    if (confirm(`Remover usuário ${user?.username}?`)) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const updateUser = (id: string, updates: Partial<UserType>) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
    alert('Usuário atualizado!');
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
        if (!trimmedLine || trimmedLine === ',,' || trimmedLine === ';;') return;
        if (trimmedLine.toLowerCase().startsWith('categoria,') || trimmedLine.toLowerCase().startsWith('categoria;')) return;

        const parts = trimmedLine.includes(';') ? trimmedLine.split(';') : trimmedLine.split(',');
        if (parts.length >= 3) {
          const catName = parts[0].replace(/"/g, '').trim();
          const toolName = parts[1].replace(/"/g, '').trim();
          const toolUrl = parts[2].replace(/"/g, '').trim();

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

        <div className="hidden md:flex items-center gap-6">
          {currentUser && (
            <div className="flex items-center gap-2 px-3 py-1 bg-sky-500/10 rounded-full border border-sky-500/20">
              <User className="w-3 h-3 text-sky-400" />
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">{currentUser.username}</span>
            </div>
          )}
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
              <Lock className="w-4 h-4" /> Painel
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
            <section className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full mb-6">
                <Shield className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-sky-400 tracking-widest uppercase">Base de Dados Unificada: {tools.length} Ferramentas</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 neon-text tracking-tighter">
                OSINT <span className="text-sky-500">Analytics</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 uppercase tracking-[0.2em] font-light">
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

            {/* Categories Fixed Menu */}
            <div className="z-40 glass border border-sky-900/30 mb-8 rounded-[2rem] overflow-hidden backdrop-blur-xl">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                  <Filter className="w-4 h-4 text-sky-500" />
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                    Explorar por Categoria
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-2.5 rounded-xl text-[10px] md:text-xs font-bold transition-all border flex items-center justify-between gap-2 text-center ${activeCategory === 'all' ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20' : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                  >
                    <span className="truncate">Todos Ativos</span>
                    <span className="flex-shrink-0 text-[10px] opacity-60 bg-white/10 px-1.5 py-0.5 rounded">{tools.length}</span>
                  </button>
                  {categories.map(cat => {
                    const count = tools.filter(t => t.categoryId === cat.id).length;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-2.5 rounded-xl text-[10px] md:text-xs font-bold transition-all border flex items-center justify-between gap-2 text-center ${activeCategory === cat.id ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20' : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="flex-shrink-0 text-[10px] opacity-60 bg-white/10 px-1.5 py-0.5 rounded">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tools Grid Area */}
            <div className="w-full">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-slate-500 text-sm font-medium">Filtro atual: <span className="text-sky-400 font-bold">{activeCategory === 'all' ? 'Todos' : categories.find(c => c.id === activeCategory)?.name}</span> — <span className="text-white font-bold">{filteredTools.length}</span> itens</span>
                {activeCategory !== 'all' && (
                  <button onClick={() => setActiveCategory('all')} className="text-sky-500 text-xs font-bold uppercase hover:underline flex items-center gap-1">
                    <X className="w-3 h-3" /> Limpar Filtro
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <h4 className="text-lg font-bold mb-2 group-hover:text-sky-400 transition-colors truncate">{tool.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mb-8 flex-1 line-clamp-3">{tool.description}</p>
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-center py-2.5 bg-slate-800/50 hover:bg-sky-500 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-slate-700 hover:border-sky-400"
                    >
                      Acessar Fonte
                    </a>
                  </div>
                ))}
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
                <p className="text-slate-400 text-sm">Autenticação de Operador OSINT</p>
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
                    <input name="user" type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-sky-500/50 outline-none transition text-white" placeholder="Admin" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Senha</label>
                    <input name="pass" type="password" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-sky-500/50 outline-none transition text-white" placeholder="••••••••" required />
                  </div>
                  <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-sky-500/20 transition-all">
                    Entrar no Terminal
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
                <h2 className="text-4xl font-extrabold tracking-tighter">Gestão de <span className="text-sky-500">Operações</span></h2>
                <p className="text-slate-400 mt-1">Total de registros: <span className="text-white font-bold">{tools.length}</span> ativos — <span className="text-white font-bold">{users.length}</span> operadores</p>
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
              </div>
            </header>

            {/* User Management Section */}
            <section className="glass p-8 rounded-[2rem] border-sky-500/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                    <Users className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Operadores do Sistema</h3>
                    <p className="text-xs text-slate-500">Controle de acesso ao terminal administrativo</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const u = prompt('Nome de usuário:');
                    const p = prompt('Senha:');
                    if (u && p) addUser(u, p, 'admin');
                  }}
                  className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-sky-500/10"
                >
                  <UserPlus className="w-4 h-4" /> Novo Operador
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {users.map(u => (
                  <div key={u.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${u.role === 'admin' ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold block">{u.username}</span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{u.role}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => {
                            const newPass = prompt('Nova senha para ' + u.username + ':');
                            if (newPass) updateUser(u.id, { password: newPass });
                          }}
                          className="p-2 text-slate-500 hover:text-sky-400 transition-colors"
                          title="Alterar Senha"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            const newName = prompt('Novo nome de usuário:', u.username);
                            if (newName) updateUser(u.id, { username: newName });
                          }}
                          className="p-2 text-slate-500 hover:text-sky-400 transition-colors"
                          title="Editar Nome"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => removeUser(u.id)}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Senha Protegida</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Categorias Section - Agora FULL WIDTH e com GRID organizado */}
              <section className="glass p-8 rounded-[2rem] xl:col-span-2">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                      <Globe className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Gestão de Categorias</h3>
                      <p className="text-xs text-slate-500">Organize os filtros do portal principal</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const name = prompt('Nome da nova categoria:');
                      if (name) addCategory(name);
                    }}
                    className="bg-sky-500 hover:bg-sky-600 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-sky-500/10 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Nova Categoria
                  </button>
                </div>
                
                {/* Grid Multi-coluna sem scroll interno */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-slate-900/40 p-4 rounded-xl flex items-center justify-between border border-slate-800 group hover:border-sky-500/30 transition-all">
                      <div className="truncate pr-2">
                         <span className="font-bold text-xs block truncate text-slate-200 group-hover:text-white">{cat.name}</span>
                         <span className="text-[9px] text-slate-500 font-bold uppercase">{tools.filter(t => t.categoryId === cat.id).length} Ativos</span>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => {
                          const name = prompt('Novo nome:', cat.name);
                          if (name) setCategories(categories.map(c => c.id === cat.id ? { ...c, name } : c));
                        }} className="p-1.5 text-slate-500 hover:text-sky-400 transition-colors" title="Editar"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => removeCategory(cat.id)} className="p-1.5 text-slate-500 hover:text-red-400 transition-colors" title="Excluir"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

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
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2024 Terminal Central de Operações. Ativos: {tools.length}</p>
      </footer>
    </div>
  );
};

export default App;
