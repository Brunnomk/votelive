import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../services/api';
import type { Usuario } from '../types/usuario';

function CriarEnquete() {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [titulo, setTitulo] = useState('');
    const [pergunta, setPergunta] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [opcoes, setOpcoes] = useState(['', '']);
    const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    async function carregarUsuarios() {
        try {
            setCarregandoUsuarios(true);
            setErro('');

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

    useEffect(() => {
        carregarUsuarios();
    }, []);

    function atualizarOpcao(index: number, valor: string) {
        const novasOpcoes = [...opcoes];
        novasOpcoes[index] = valor;
        setOpcoes(novasOpcoes);
    }

    function adicionarOpcao() {
        setOpcoes([...opcoes, '']);
    }

    function removerOpcao(index: number) {
        if (opcoes.length <= 2) {
            setErro('A enquete precisa ter pelo menos duas opções.');
            return;
        }

        const novasOpcoes = opcoes.filter((_, itemIndex) => itemIndex !== index);
        setOpcoes(novasOpcoes);
    }

    async function criarEnquete(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setCarregando(true);
            setErro('');
            setSucesso('');

            const opcoesValidas = opcoes
                .map((opcao) => opcao.trim())
                .filter((opcao) => opcao.length > 0);

            if (!titulo.trim()) {
                setErro('Informe o título da enquete.');
                return;
            }

            if (!pergunta.trim()) {
                setErro('Informe a pergunta da enquete.');
                return;
            }

            if (!usuarioId) {
                setErro('Selecione o usuário criador.');
                return;
            }

            if (opcoesValidas.length < 2) {
                setErro('Informe pelo menos duas opções.');
                return;
            }

            const response = await api.post('/enquetes', {
                titulo,
                pergunta,
                usuarioId: Number(usuarioId),
                opcoes: opcoesValidas,
            });

            setSucesso('Enquete criada com sucesso!');

            setTimeout(() => {
                navigate(`/enquetes/${response.data.id}/resultado`);
            }, 700);
        } catch (error: any) {
            const mensagem =
                error.response?.data?.erro || 'Não foi possível criar a enquete.';

            setErro(mensagem);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="app">
            <section className="hero">
                <span className="badge">Nova Enquete</span>

                <h1>Criar Enquete</h1>

                <p>
                    Cadastre uma nova enquete com múltiplas opções de voto.
                </p>

                <div className="dashboard-actions">
                    <Link className="secondary-button link-button" to="/enquetes">
                        Voltar para Enquetes
                    </Link>

                    <Link className="secondary-button link-button" to="/usuarios">
                        Gerenciar Usuários
                    </Link>
                </div>
            </section>

            <section className="form-panel">
                <form onSubmit={criarEnquete} className="poll-form">
                    {erro && <div className="error-box">{erro}</div>}

                    {sucesso && <div className="success-box">{sucesso}</div>}

                    <div className="form-group">
                        <label htmlFor="titulo">Título</label>

                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(event) => setTitulo(event.target.value)}
                            placeholder="Ex: Linguagem preferida"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pergunta">Pergunta</label>

                        <textarea
                            id="pergunta"
                            value={pergunta}
                            onChange={(event) => setPergunta(event.target.value)}
                            placeholder="Ex: Qual linguagem você escolheria?"
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="usuarioId">Usuário Criador</label>

                        <select
                            id="usuarioId"
                            value={usuarioId}
                            onChange={(event) => setUsuarioId(event.target.value)}
                            disabled={carregandoUsuarios || usuarios.length === 0}
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
                        <div className="form-section-title">
                            <label>Opções de Voto</label>

                            <button
                                type="button"
                                className="small-button"
                                onClick={adicionarOpcao}
                            >
                                + Adicionar Opção
                            </button>
                        </div>

                        <div className="options-list">
                            {opcoes.map((opcao, index) => (
                                <div className="option-row" key={index}>
                                    <input
                                        type="text"
                                        value={opcao}
                                        onChange={(event) =>
                                            atualizarOpcao(index, event.target.value)
                                        }
                                        placeholder={`Opção ${index + 1}`}
                                    />

                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() => removerOpcao(index)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="refresh-button submit-button"
                        disabled={carregando || carregandoUsuarios || usuarios.length === 0}
                    >
                        {carregando ? 'Criando...' : 'Criar Enquete'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default CriarEnquete;