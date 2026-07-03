import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import type { ResultadoEnquete } from '../types/resultado';

const CHART_COLORS = [
    '#3b82f6',
    '#22c55e',
    '#a855f7',
    '#f97316',
    '#ef4444',
    '#14b8a6',
];

function ResultadoEnquetePage() {
    const { id } = useParams();

    const [resultado, setResultado] = useState<ResultadoEnquete | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [tempoRealAtivo, setTempoRealAtivo] = useState(false);

    function limitarTexto(texto: string, limite = 10) {
        return texto.length > limite ? `${texto.slice(0, limite)}...` : texto;
    }

    async function carregarResultado() {
        try {
            setCarregando(true);
            setErro('');

            const response = await api.get<ResultadoEnquete>(
                `/enquetes/${id}/resultado`,
            );

            setResultado(response.data);
        } catch {
            setErro('Não foi possível carregar o resultado da enquete.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarResultado();
    }, [id]);

    useEffect(() => {
        if (!id) {
            return;
        }

        const client = criarSocketClient();

        client.onConnect = () => {
            setTempoRealAtivo(true);

            client.subscribe(`/topic/enquetes/${id}/resultado`, (message) => {
                const resultadoAtualizado = JSON.parse(
                    message.body,
                ) as ResultadoEnquete;

                setResultado(resultadoAtualizado);
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
            client.deactivate();
        };
    }, [id]);

    if (carregando && !resultado) {
        return (
            <main className="app">
                <h1>Carregando resultado...</h1>
            </main>
        );
    }

    if (erro && !resultado) {
        return (
            <main className="app">
                <h1>Erro</h1>
                <p>{erro}</p>

                <Link className="secondary-button link-button" to="/enquetes">
                    Voltar para Enquetes
                </Link>
            </main>
        );
    }

    if (!resultado) {
        return null;
    }

    return (
        <main className="app">
            <section className="hero">
        <span className={`status-pill status-${resultado.status.toLowerCase()}`}>
          {resultado.status}
        </span>

                <h1>{resultado.titulo}</h1>

                <p>{resultado.pergunta}</p>

                <div className="dashboard-actions">
                    <button
                        className="refresh-button"
                        onClick={carregarResultado}
                        disabled={carregando}
                    >
                        {carregando ? 'Atualizando...' : 'Atualizar Resultado'}
                    </button>

                    <Link className="secondary-button link-button" to="/enquetes">
                        Voltar para Enquetes
                    </Link>

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

            <section className="cards-grid result-cards">
                <div className="card">
                    <span>Total de Votos</span>
                    <strong>{resultado.totalVotos}</strong>
                </div>

                <div className="card">
                    <span>Vencedor</span>
                    <strong>{resultado.vencedor}</strong>
                </div>

                <div className="card">
                    <span>Total de Opções</span>
                    <strong>{resultado.opcoes.length}</strong>
                </div>
            </section>

            <section className="dashboard-grid">
                <div className="panel">
                    <h2>Distribuição dos Votos</h2>

                    <div className="chart-box">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={resultado.opcoes}
                                    dataKey="quantidadeVotos"
                                    nameKey="texto"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={4}
                                >
                                    {resultado.opcoes.map((opcao, index) => (
                                        <Cell
                                            key={opcao.opcaoId}
                                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="list">
                        {resultado.opcoes.map((opcao, index) => (
                            <div className="list-item" key={opcao.opcaoId}>
                <span className="status-label" title={opcao.texto}>
                  <i
                      style={{
                          backgroundColor:
                              CHART_COLORS[index % CHART_COLORS.length],
                      }}
                  />
                    {opcao.texto}
                </span>

                                <strong>{opcao.percentual.toFixed(1)}%</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <h2>Votos por Opção</h2>

                    <div className="chart-box">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={resultado.opcoes}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

                                <XAxis
                                    dataKey="texto"
                                    stroke="#94a3b8"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => limitarTexto(String(value), 10)}
                                />

                                <YAxis
                                    stroke="#94a3b8"
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="quantidadeVotos"
                                    fill="#3b82f6"
                                    radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="ranking-list">
                        {resultado.opcoes.map((opcao, index) => (
                            <div className="ranking-item" key={opcao.opcaoId}>
                                <div className="ranking-position">
                                    {index + 1}º
                                </div>

                                <div className="ranking-content">
                                    <strong title={opcao.texto}>{opcao.texto}</strong>
                                    <span>{opcao.percentual.toFixed(1)}% dos votos</span>
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

export default ResultadoEnquetePage;