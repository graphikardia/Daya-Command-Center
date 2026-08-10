"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "281107") {
      document.cookie = "gkos_auth=verified_281107; path=/; max-age=86400";
      router.push("/");
    } else {
      setError(true);
      setCode("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020205] text-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#020205] to-[#020205]" />
      
      <div className="relative z-10 w-full max-w-sm p-8 rounded-lg bg-black/40 border border-white/10 backdrop-blur-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-500 mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-white tracking-[0.2em] uppercase">SYSTEM LOCKED</h1>
          <p className="text-xs text-slate-500 font-mono mt-2">Daya Core - Awaiting pass-sequence</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="AUTHENTICATE..."
            className={`w-full px-4 py-3 bg-white/5 border ${error ? 'border-red-500/50 text-red-400' : 'border-white/10 text-white'} rounded text-center text-lg font-mono tracking-[0.3em] focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-700 placeholder:text-sm placeholder:tracking-[0.1em]`}
            autoFocus
          />
          <button 
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black tracking-[0.3em] uppercase rounded transition-colors"
          >
            Terminal Login
          </button>
        </form>

        {error && (
          <p className="text-center text-[10px] text-red-500 font-bold mt-4 tracking-widest uppercase animate-pulse">
            ACCESS DENIED
          </p>
        )}
      </div>
    </div>
  );
}
