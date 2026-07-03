import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import { api } from '../services/api';
import type { Usuario } from '../types/usuario';

function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    async function carregarUsuarios() {
        try {
            setCarregando(true);
            setErro('');

            const response = await api.get<Usuario[]>('/usuarios');

            setUsuarios(response.data);
        } catch {
            setErro('Não foi possível carregar os usuários.');
        } finally {
            setCarregando(false);
        }
    }

    async function criarUsuario(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setSalvando(true);
            setErro('');
            setSucesso('');

            if (!nome.trim()) {
                setErro('Informe o nome do usuário.');
                return;
            }

            if (!email.trim()) {
                setErro('Informe o email do usuário.');
                return;
            }

            await api.post('/usuarios', {
                nome,
                email,
            });

            setNome('');
            setEmail('');
            setSucesso('Usuário criado com sucesso!');

            await carregarUsuarios();
        } catch (error: any) {
            const mensagem =
                error.response?.data?.erro || 'Não foi possível criar o usuário.';

            setErro(mensagem);
        } finally {
            setSalvando(false);
        }
    }

    useEffect(() => {
        carregarUsuarios();
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
                <span className="badge">Usuários</span>

                <h1>Gerenciar Usuários</h1>

                <p>
                    Cadastre e visualize os usuários que podem criar enquetes e votar.
                </p>

                <div className="dashboard-actions">
                    <button
                        className="refresh-button"
                        onClick={carregarUsuarios}
                        disabled={carregando}
                    >
                        {carregando ? 'Atualizando...' : 'Atualizar Usuários'}
                    </button>
                </div>
            </section>

            <section className="users-layout">
                <div className="form-panel">
                    <form className="poll-form" onSubmit={criarUsuario}>
                        <h2>Novo Usuário</h2>

                        {erro && <div className="error-box">{erro}</div>}

                        {sucesso && <div className="success-box">{sucesso}</div>}

                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>

                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                placeholder="Ex: Brunno"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Ex: brunno@email.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className="refresh-button submit-button"
                            disabled={salvando}
                        >
                            {salvando ? 'Salvando...' : 'Criar Usuário'}
                        </button>
                    </form>
                </div>

                <section className="panel users-panel">
                    <h2>Usuários Cadastrados</h2>

                    {carregando && usuarios.length === 0 ? (
                        <p>Carregando usuários...</p>
                    ) : (
                        <div className="users-list">
                            {usuarios.map((usuario) => (
                                <article className="user-card" key={usuario.id}>
                                    <div>
                                        <strong>{usuario.nome}</strong>
                                        <span>{usuario.email}</span>
                                    </div>

                                    <div className="user-meta">
                                        <span>#{usuario.id}</span>
                                        <small>{formatarData(usuario.dataCriacao)}</small>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}

export default Usuarios;