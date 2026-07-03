import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { api } from '../services/api';
import { criarSocketClient } from '../services/socket';
import type {
    DashboardResumo,
    RankingOpcao,
    StatusEnqueteResumo,
} from '../types/dashboard';

const STATUS_COLORS: Record<StatusEnqueteResumo['status'], string> = {
    ABERTA: '#22c55e',
    ENCERRADA: '#3b82f6',
    CANCELADA: '#ef4444',
};

function Dashboard() {
    const [resumo, setResumo] = useState<DashboardResumo | null>(null);
    const [statusEnquetes, setStatusEnquetes] = useState<StatusEnqueteResumo[]>([]);
    const [rankingOpcoes, setRankingOpcoes] = useState<RankingOpcao[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState('');
    const [tempoRealAtivo, setTempoRealAtivo] = useState(false);

    const alturaGraficoRanking = Math.max(260, rankingOpcoes.length * 48);

    function limitarTexto(texto: string, limite = 14) {
        return texto.length > limite ? `${texto.slice(0, limite)}...` : texto;
    }

    async function carregarDashboard() {
        try {
            setCarregando(true);
            setErro('');

            const [resumoResponse, statusResponse, rankingResponse] =
                await Promise.all([
                    api.get<DashboardResumo>('/dashboard/resumo'),
                    api.get<StatusEnqueteResumo[]>('/dashboard/status-enquetes'),
                    api.get<RankingOpcao[]>('/dashboard/ranking-opcoes'),
                ]);

            setResumo(resumoResponse.data);
            setStatusEnquetes(statusResponse.data);
            setRankingOpcoes(rankingResponse.data);

            const agora = new Date();

            setUltimaAtualizacao(
                agora.toLocaleTimeString('pt-PT', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            );
        } catch {
            setErro('Não foi possível carregar os dados do dashboard.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        void carregarDashboard();
    }, []);

    useEffect(() => {
        const client = criarSocketClient();

        client.onConnect = () => {
            setTempoRealAtivo(true);

            client.subscribe('/topic/dashboard/atualizar', () => {
                void carregarDashboard();
            });
        };

        client.onDisconnect = () => {
            setTempoRealAtivo(false);
        };

        client.onStompError = () => {
            setTempoRealAtivo(false);
        };

        client.activate();

        return () => {
            void client.deactivate();
        };
    }, []);

    if (carregando && !resumo) {
        return (
            <main className="app">
                <h1>Carregando dashboard...</h1>
            </main>
        );
    }

    if (erro && !resumo) {
        return (
            <main className="app">
                <h1>Erro</h1>
                <p>{erro}</p>
            </main>
        );
    }

    return (
        <main className="app">
            <section className="hero">
                <span className="badge">VoteLive</span>

                <h1>Dashboard de Votação</h1>

                <p>
                    Sistema de votação com resultados, rankings e gráficos interativos.
                </p>

                <div className="dashboard-actions">
                    <button
                        className="refresh-button"
                        onClick={carregarDashboard}
                        disabled={carregando}
                    >
                        {carregando ? 'Atualizando...' : 'Atualizar Dashboard'}
                    </button>

                    {ultimaAtualizacao && (
                        <span className="updated-at">
              Última atualização: {ultimaAtualizacao}
            </span>
                    )}

                    <span
                        className={
                            tempoRealAtivo
                                ? 'realtime-status realtime-on'
                                : 'realtime-status realtime-off'
                        }
                    >
            {tempoRealAtivo ? 'Tempo real ativo' : 'Tempo real desconectado'}
          </span>
                </div>
            </section>

            <section className="cards-grid">
                <div className="card">
                    <span>Total de Usuários</span>
                    <strong>{resumo?.totalUsuarios}</strong>
                </div>

                <div className="card">
                    <span>Total de Enquetes</span>
                    <strong>{resumo?.totalEnquetes}</strong>
                </div>

                <div className="card">
                    <span>Total de Votos</span>
                    <strong>{resumo?.totalVotos}</strong>
                </div>

                <div className="card">
                    <span>Enquetes Abertas</span>
                    <strong>{resumo?.enquetesAbertas}</strong>
                </div>

                <div className="card">
                    <span>Enquetes Encerradas</span>
                    <strong>{resumo?.enquetesEncerradas}</strong>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="panel">
                    <h2>Status das Enquetes</h2>

                    <div className="chart-box">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={statusEnquetes}
                                    dataKey="quantidade"
                                    nameKey="status"
                                    innerRadius={60}
                                    outerRadius={95}
                                    paddingAngle={4}
                                >
                                    {statusEnquetes.map((item) => (
                                        <Cell
                                            key={item.status}
                                            fill={STATUS_COLORS[item.status]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="list">
                        {statusEnquetes.map((item) => (
                            <div className="list-item" key={item.status}>
                <span className="status-label">
                  <i
                      style={{
                          backgroundColor: STATUS_COLORS[item.status],
                      }}
                  />

                    {item.status}
                </span>

                                <strong>{item.quantidade}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <h2>Ranking de Opções</h2>

                    <div
                        className="chart-box"
                        style={{ height: alturaGraficoRanking }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={rankingOpcoes}
                                layout="vertical"
                                margin={{
                                    top: 10,
                                    right: 20,
                                    bottom: 10,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

                                <XAxis
                                    type="number"
                                    stroke="#94a3b8"
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="texto"
                                    width={120}
                                    stroke="#94a3b8"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => limitarTexto(String(value), 14)}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="quantidadeVotos"
                                    fill="#3b82f6"
                                    radius={[0, 10, 10, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="ranking-list">
                        {rankingOpcoes.map((opcao, index) => (
                            <div className="ranking-item" key={opcao.opcaoId}>
                                <div className="ranking-position">
                                    {index + 1}º
                                </div>

                                <div className="ranking-content">
                                    <strong title={opcao.texto}>{opcao.texto}</strong>
                                    <span title={opcao.enqueteTitulo}>
                    {opcao.enqueteTitulo}
                  </span>
                                </div>

                                <div className="ranking-votes">
                                    <strong>{opcao.quantidadeVotos}</strong>
                                    <span>
                    {opcao.quantidadeVotos === 1 ? 'voto' : 'votos'}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;