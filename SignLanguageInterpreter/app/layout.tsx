import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aurora | Sign Language Hub",
  description: "Advanced Sign Language Interpretation and Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased w-full min-h-screen relative bg-[#F8FAFC] text-slate-900 font-sans overflow-y-auto">
        {/* Dynamic Immersive Background Orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60rem] h-[60rem] bg-indigo-500/10 blur-[120px] rounded-full animate-float"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-purple-500/10 blur-[120px] rounded-full animate-float-delayed"></div>
          <div className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-blue-400/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-5s' }}></div>
        </div>

        <div className="relative z-10 w-full min-h-screen flex flex-col">
          <header className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[1400px] z-50 glass-orb rounded-full p-4 px-10 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="flex flex-col">
                <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity">AURORA 👧</Link>
                <span className="label-premium opacity-50">Sign Language Hub</span>
              </div>
              <nav className="flex items-center gap-2 p-1 bg-slate-900/5 rounded-full">
                <Link href="/interpreter" className="label-premium px-8 py-2.5 rounded-full bg-white text-slate-900 shadow-sm border-none">Interpreter</Link>
                <Link href="/teach" className="label-premium px-8 py-2.5 rounded-full text-slate-500 hover:bg-white/50 border-none transition-all">Training Hub</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                <a href="http://localhost:5173" className="label-premium px-6 py-2.5 bg-slate-900 text-white rounded-full shadow-lg hover:scale-105 transition-all">Concierge</a>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">UN</div>
            </div>
          </header>

          <main className="flex-1 w-full max-w-[1400px] mx-auto pt-32 p-8 h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
