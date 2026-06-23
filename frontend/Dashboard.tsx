import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Database, Lock } from 'lucide-react';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [systemHealth, setSystemHealth] = useState(100);

  useEffect(() => {
    // Simulação de fetch de logs do backend
    setLogs([
      { id: '1', trace: 'trace-8f9a', risk: 85, status: 'BLOCKED', time: '10:42:01' },
      { id: '2', trace: 'trace-2b1c', risk: 10, status: 'ALLOWED', time: '10:41:55' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-8">
      <header className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <ShieldAlert className="w-10 h-10 text-emerald-500" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">AegisOtel Vault</h1>
            <p className="text-sm text-slate-400">Enterprise Telemetry Security Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">System Health: {systemHealth}%</span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" /> Live Ingestion Logs
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3">Trace ID</th>
                  <th className="pb-3">Risk Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-800/50">
                    <td className="py-4 font-mono text-slate-300">{log.trace}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${log.risk > 75 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {log.risk}/100
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1 ${log.status === 'BLOCKED' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {log.status === 'BLOCKED' && <Lock className="w-3 h-3" />}
                        {log.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-500">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4">Security Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Injection Attempts Blocked</span>
                <span className="font-bold text-white">1,204</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Clean Logs Ingested</span>
                <span className="font-bold text-white">45,892</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}