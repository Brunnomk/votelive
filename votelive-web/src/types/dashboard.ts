export type DashboardResumo = {
    totalUsuarios: number;
    totalEnquetes: number;
    totalVotos: number;
    enquetesAbertas: number;
    enquetesEncerradas: number;
};

export type StatusEnqueteResumo = {
    status: 'ABERTA' | 'ENCERRADA' | 'CANCELADA';
    quantidade: number;
};

export type RankingOpcao = {
    opcaoId: number;
    texto: string;
    quantidadeVotos: number;
    enqueteTitulo: string;
};