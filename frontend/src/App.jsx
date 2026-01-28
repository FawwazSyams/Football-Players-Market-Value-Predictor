import React, { useState } from "react";

function App() {
  const [inputs, setInputs] = useState({
    age: 25,
    goals: 10,
    assists: 5,
    minutes: 1500,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch("fawdaw-production-market-value-predictor.up.railway.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      setResult(data.price);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12 font-sans bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 inline-block">
          FOOTBALL PLAYERS MARKET VALUE PREDICTOR
        </h1>
        <p className="text-slate-500 text-sm tracking-widest mt-1">
          MARKET VALUE ANALYTICS BY FAWDAW
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KOLOM KIRI: FORM INPUT (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
              Statistik Pemain
            </h2>

            <div className="grid gap-5">
              {Object.keys(inputs).map((key) => (
                <div key={key} className="group">
                  <label className="block text-[10px] uppercase text-slate-500 font-black mb-1 group-focus-within:text-emerald-400 transition-colors">
                    {key === "age"
                      ? "Umur"
                      : key === "goals"
                        ? "Goals"
                        : key === "assists"
                          ? "Assists"
                          : "Menit Bermain"}
                  </label>
                  <input
                    type="number"
                    value={inputs[key]}
                    onChange={(e) =>
                      setInputs({ ...inputs, [key]: e.target.value })
                    }
                    className="w-full bg-slate-800/50 p-4 rounded-2xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white placeholder-slate-600"
                  />
                </div>
              ))}

              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full py-4 mt-4 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-tighter"
              >
                {loading ? "Processing..." : "Buat Prediksi"}
              </button>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: RESULT (Span 7) */}
        <div className="lg:col-span-7">
          <div className="h-full bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-white/10 flex flex-col justify-center items-center relative overflow-hidden min-h-[400px]">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>

            {result ? (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <p className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs mb-4">
                  Analisis Selesai
                </p>
                <h3 className="text-slate-400 text-lg font-medium mb-2">
                  Estimasi Market Value Pemain:
                </h3>
                <div className="text-7xl md:text-8xl font-black tracking-tighter text-white">
                  <span className="text-emerald-500">€ </span>
                  {result.toLocaleString("de-DE")}
                </div>
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Accuracy: 16.9%
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 border-4 border-slate-800 border-t-emerald-500 rounded-full mx-auto mb-6 animate-spin opacity-20"></div>
                <p className="text-slate-500 font-medium italic">
                  Masukkan statistik pemain untuk memulai analisis...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-slate-500 text-xs mt-6">
          © 2026 designed by Fawwaz Dawaa Production.
        </p>
      </div>
    </div>
  );
}

export default App;
