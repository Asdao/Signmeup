import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, Volume2, VolumeX, LayoutDashboard, MessageSquare, Shield } from 'lucide-react';
import Chat from './features/chat/Chat';
import Dashboard from './features/dashboard/Dashboard';

function App() {
  const [autoSpeak, setAutoSpeak] = useState(() => {
    const saved = localStorage.getItem('autoSpeak');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const handleToggleAutoSpeak = () => {
    setAutoSpeak((prev: boolean) => {
      const next = !prev;
      localStorage.setItem('autoSpeak', JSON.stringify(next));
      return next;
    });
  };

  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="w-full min-h-screen relative bg-[#F8FAFC] overflow-hidden">
      {/* Dynamic Immersive Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60rem] h-[60rem] bg-indigo-500/10 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-purple-500/10 blur-[120px] rounded-full animate-float-delayed"></div>
        <div className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-blue-400/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-5s' }}></div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col p-[clamp(1.5rem,5vw,3rem)] max-w-[1920px] mx-auto">

        {/* Floating Dock Header */}
        <header className="flex items-center justify-between shrink-0 glass-orb rounded-full p-4 px-8 shadow-2xl mb-12">
          <div className="flex items-center gap-16">
            <div className="flex flex-col">
              <h1 className="text-3xl font-black uppercase text-slate-900 leading-none mb-1.5">Aurora 👧</h1>
              <span className="label-premium opacity-50">Intelligence Engine</span>
            </div>

            <nav className="flex items-center gap-1.5 p-1.5 bg-slate-900/5 rounded-full">
              <Link
                to="/"
                className={`label-premium flex items-center gap-2 px-8 py-3 rounded-full transition-all border-none ${!isDashboard ? 'bg-white text-slate-900 shadow-sm opacity-100' : 'text-slate-500 hover:bg-white/50'}`}
              >
                <MessageSquare className="w-4 h-4" />
                Concierge
              </Link>
              <Link
                to="/dashboard"
                className={`label-premium flex items-center gap-2 px-8 py-3 rounded-full transition-all border-none ${isDashboard ? 'bg-white text-slate-900 shadow-sm opacity-100' : 'text-slate-500 hover:bg-white/50'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open('http://localhost:8081', '_blank')}
                className="label-premium flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white shadow-xl hover:scale-105 transition-all"
              >
                <Shield className="w-4 h-4" /> PathGuardian
              </button>

              <button
                onClick={() => window.open('http://localhost:3000', '_blank')}
                className="label-premium flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 border border-slate-100 shadow-sm hover:bg-slate-50 transition-all"
              >
                <span>🖖</span> Sign Language
              </button>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleAutoSpeak}
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all border ${autoSpeak ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                title={autoSpeak ? "Disable auto-speech" : "Enable auto-speech"}
              >
                {autoSpeak ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-xl hover:scale-105 transition-all">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Immersive Main Display */}
        <main className="flex-1 relative glass-orb rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
          <Routes>
            <Route path="/" element={<Chat autoSpeak={autoSpeak} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
