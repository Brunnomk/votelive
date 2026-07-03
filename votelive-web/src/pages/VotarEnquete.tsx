import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { api } from '../services/api';
import type { ResultadoEnquete } from '../types/resultado';
import type { Usuario } from '../types/usuario';

function VotarEnquete() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [resultado, setResultado] = useState<ResultadoEnquete | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuarioId, setUsuarioId] = useState('');
    const [opcaoId, setOpcaoId] = useState<number | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    async function carregarEnquete() {
        try {
            setErro('');

            const response = await api.get<ResultadoEnquete>(
                `/enquetes/${id}/resultado`,
            );

            setResultado(response.data);
        } catch {
            setErro('Não foi possível carregar a enquete.');
        }
    }

    async function carregarUsuarios() {
        try {
            setCarregandoUsuarios(true);

            const response = await api.get<Usuario[]>('/usuarios');

            setUsuarios(response.data);

            if (response.data.length > 0) {
                setUsuarioId(String(response.data[0].id));
            }
        } catch {
            setErro('Não foi possível carregar os usuários.');
        } finally {
            setCarregandoUsuarios(false);
        }
    }

    async function carregarDados() {
        try {
            setCarregando(true);
            setErro('');

            await Promise.all([
                carregarEnquete(),
                carregarUsuarios(),
            ]);
        } finally {
            setCarregando(false);
        }
    }

    async function confirmarVoto() {
        try {
            setEnviando(true);
            setErro('');
            setSucesso('');

            if (!usuarioId) {
                setErro('Selecione o usuário.');
                return;
            }

            if (!opcaoId) {
                setErro('Selecione uma opção para votar.');
                return;
            }

            await api.post(`/enquetes/${id}/votos`, {
                usuarioId: Number(usuarioId),
                opcaoId,
            });

            setSucesso('Voto registrado com sucesso!');

            setTimeout(() => {
                navigate(`/enquetes/${id}/resultado`);
            }, 700);
        } catch (error: any) {
            const mensagem =
                error.response?.data?.erro || 'Não foi possível registrar o voto.';

            setErro(mensagem);
        } finally {
            setEnviando(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, [id]);

    if (carregando && !resultado) {
        return (
            <main className="app">
                <h1>Carregando enquete...</h1>
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

                <h1>Votar na Enquete</h1>

                <p>{resultado.pergunta}</p>

                <div className="dashboard-actions">
                    <Link className="secondary-button link-button" to="/enquetes">
                        Voltar para Enquetes
                    </Link>

                    <Link
                        className="secondary-button link-button"
                        to={`/enquetes/${id}/resultado`}
                    >
                        Ver Resultado
                    </Link>
                </div>
            </section>

            <section className="form-panel">
                {resultado.status !== 'ABERTA' && (
                    <div className="error-box">
                        Esta enquete não está aberta para votação.
                    </div>
                )}

                {erro && <div className="error-box">{erro}</div>}

                {sucesso && <div className="success-box">{sucesso}</div>}

                <div className="poll-form">
                    <div className="form-group">
                        <label htmlFor="usuarioId">Usuário</label>

                        <select
                            id="usuarioId"
                            value={usuarioId}
                            onChange={(event) => setUsuarioId(event.target.value)}
                            disabled={
                                carregandoUsuarios ||
                                usuarios.length === 0 ||
                                resultado.status !== 'ABERTA'
                            }
                        >
                            {carregandoUsuarios && (
                                <option value="">Carregando usuários...</option>
                            )}

                            {!carregandoUsuarios && usuarios.length === 0 && (
                                <option value="">Nenhum usuário cadastrado</option>
                            )}

                            {!carregandoUsuarios &&
                                usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nome} - {usuario.email}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Escolha uma opção</label>

                        <div className="vote-options">
                            {resultado.opcoes.map((opcao) => (
                                <button
                                    type="button"
                                    key={opcao.opcaoId}
                                    className={
                                        opcaoId === opcao.opcaoId
                                            ? 'vote-option selected'
                                            : 'vote-option'
                                    }
                                    onClick={() => setOpcaoId(opcao.opcaoId)}
                                    disabled={resultado.status !== 'ABERTA'}
                                >
                                    <span>{opcao.texto}</span>
                                    <small>{opcao.quantidadeVotos} votos até agora</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="refresh-button submit-button"
                        onClick={confirmarVoto}
                        disabled={
                            enviando ||
                            resultado.status !== 'ABERTA' ||
                            usuarios.length === 0
                        }
                    >
                        {enviando ? 'Registrando...' : 'Confirmar Voto'}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default VotarEnquete;