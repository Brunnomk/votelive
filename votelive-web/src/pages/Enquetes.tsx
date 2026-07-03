import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../services/api';
import type { Enquete } from '../types/enquete';

function Enquetes() {
    const [enquetes, setEnquetes] = useState<Enquete[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [encerrandoId, setEncerrandoId] = useState<number | null>(null);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    async function carregarEnquetes() {
        try {
            setCarregando(true);
            setErro('');

            const response = await api.get<Enquete[]>('/enquetes');

            setEnquetes(response.data);
        } catch {
            setErro('Não foi possível carregar as enquetes.');
        } finally {
            setCarregando(false);
        }
    }

    async function encerrarEnquete(id: number) {
        const confirmar = window.confirm(
            'Tem certeza que deseja encerrar esta enquete? Depois disso ninguém poderá votar nela.',
        );

        if (!confirmar) {
            return;
        }

        try {
            setEncerrandoId(id);
            setErro('');
            setSucesso('');

            await api.patch(`/enquetes/${id}/encerrar`);

            setSucesso('Enquete encerrada com sucesso!');

            await carregarEnquetes();
        } catch (error: any) {
            const mensagem =
                error.response?.data?.erro || 'Não foi possível encerrar a enquete.';

            setErro(mensagem);
        } finally {
            setEncerrandoId(null);
        }
    }

    useEffect(() => {
        carregarEnquetes();
    }, []);

    function formatarData(data: string) {
        return new Date(data).toLocaleString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <main className="app">
            <section className="hero">
                <span className="badge">Enquetes</span>

                <h1>Lista de Enquetes</h1>

                <p>
                    Visualize todas as enquetes cadastradas no sistema VoteLive.
                </p>

                <div className="dashboard-actions">
                    <button
                        className="refresh-button"
                        onClick={carregarEnquetes}
                        disabled={carregando}
                    >
                        {carregando ? 'Atualizando...' : 'Atualizar Enquetes'}
                    </button>

                    <Link className="secondary-button link-button" to="/enquetes/nova">
                        Criar Nova Enquete
                    </Link>
                </div>
            </section>

            {erro && (
                <div className="error-box">
                    {erro}
                </div>
            )}

            {sucesso && (
                <div className="success-box">
                    {sucesso}
                </div>
            )}

            {carregando && enquetes.length === 0 ? (
                <section className="panel">
                    <h2>Carregando enquetes...</h2>
                </section>
            ) : (
                <section className="enquetes-list">
                    {enquetes.map((enquete) => (
                        <article className="enquete-card" key={enquete.id}>
                            <div className="enquete-card-header">
                                <div>
                  <span
                      className={`status-pill status-${enquete.status.toLowerCase()}`}
                  >
                    {enquete.status}
                  </span>

                                    <h2>{enquete.titulo}</h2>
                                </div>

                                <strong>#{enquete.id}</strong>
                            </div>

                            <p>{enquete.pergunta}</p>

                            <div className="enquete-meta">
                <span>
                  Criada por: <strong>{enquete.usuario.nome}</strong>
                </span>

                                <span>
                  Criada em:{' '}
                                    <strong>{formatarData(enquete.dataCriacao)}</strong>
                </span>

                                {enquete.dataEncerramento && (
                                    <span>
                    Encerrada em:{' '}
                                        <strong>{formatarData(enquete.dataEncerramento)}</strong>
                  </span>
                                )}
                            </div>

                            <div className="enquete-actions">
                                {enquete.status === 'ABERTA' && (
                                    <Link
                                        className="primary-button link-button"
                                        to={`/enquetes/${enquete.id}/votar`}
                                    >
                                        Votar
                                    </Link>
                                )}

                                <Link
                                    className="secondary-button link-button"
                                    to={`/enquetes/${enquete.id}/resultado`}
                                >
                                    Ver Resultado
                                </Link>

                                {enquete.status === 'ABERTA' && (
                                    <button
                                        className="danger-button"
                                        onClick={() => encerrarEnquete(enquete.id)}
                                        disabled={encerrandoId === enquete.id}
                                    >
                                        {encerrandoId === enquete.id ? 'Encerrando...' : 'Encerrar'}
                                    </button>
                                )}
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Enquetes;