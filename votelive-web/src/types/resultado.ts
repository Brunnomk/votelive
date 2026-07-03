export type StatusEnquete = 'ABERTA' | 'ENCERRADA' | 'CANCELADA';

export type OpcaoResultado = {
    opcaoId: number;
    texto: string;
    quantidadeVotos: number;
    percentual: number;
};

export type ResultadoEnquete = {
    enqueteId: number;
    titulo: string;
    pergunta: string;
    status: StatusEnquete;
    totalVotos: number;
    vencedor: string;
    opcoes: OpcaoResultado[];
};