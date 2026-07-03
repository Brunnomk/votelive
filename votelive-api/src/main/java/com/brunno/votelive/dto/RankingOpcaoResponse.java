package com.brunno.votelive.dto;

public class RankingOpcaoResponse {

    private Long opcaoId;
    private String texto;
    private Integer quantidadeVotos;
    private String enqueteTitulo;

    public RankingOpcaoResponse(
            Long opcaoId,
            String texto,
            Integer quantidadeVotos,
            String enqueteTitulo
    ) {
        this.opcaoId = opcaoId;
        this.texto = texto;
        this.quantidadeVotos = quantidadeVotos;
        this.enqueteTitulo = enqueteTitulo;
    }

    public Long getOpcaoId() {
        return opcaoId;
    }

    public String getTexto() {
        return texto;
    }

    public Integer getQuantidadeVotos() {
        return quantidadeVotos;
    }

    public String getEnqueteTitulo() {
        return enqueteTitulo;
    }
}