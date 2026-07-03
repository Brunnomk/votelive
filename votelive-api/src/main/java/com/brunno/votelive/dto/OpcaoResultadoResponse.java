package com.brunno.votelive.dto;

public class OpcaoResultadoResponse {

    private Long opcaoId;
    private String texto;
    private Integer quantidadeVotos;
    private Double percentual;

    public OpcaoResultadoResponse(
            Long opcaoId,
            String texto,
            Integer quantidadeVotos,
            Double percentual
    ) {
        this.opcaoId = opcaoId;
        this.texto = texto;
        this.quantidadeVotos = quantidadeVotos;
        this.percentual = percentual;
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

    public Double getPercentual() {
        return percentual;
    }
}