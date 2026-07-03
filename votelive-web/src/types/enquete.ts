export type StatusEnquete = 'ABERTA' | 'ENCERRADA' | 'CANCELADA';

export type UsuarioResumo = {
    id: number;
    nome: string;
    email: string;
    dataCriacao: string;
};

export type Enquete = {
    id: number;
    titulo: string;
    pergunta: string;
    status: StatusEnquete;
    dataCriacao: string;
    dataEncerramento: string | null;
    usuario: UsuarioResumo;
};