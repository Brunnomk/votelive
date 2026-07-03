package com.brunno.votelive.dto;

import com.brunno.votelive.entity.StatusEnquete;

import java.util.List;

public class ResultadoEnqueteResponse {

    private Long enqueteId;
    private String titulo;
    private String pergunta;
    private StatusEnquete status;
    private Integer totalVotos;
    private String vencedor;
    private List<OpcaoResultadoResponse> opcoes;

    public ResultadoEnqueteResponse(
            Long enqueteId,
            String titulo,
            String pergunta,
            StatusEnquete status,
            Integer totalVotos,
            String vencedor,
            List<OpcaoResultadoResponse> opcoes
    ) {
        this.enqueteId = enqueteId;
        this.titulo = titulo;
        this.pergunta = pergunta;
        this.status = status;
        this.totalVotos = totalVotos;
        this.vencedor = vencedor;
        this.opcoes = opcoes;
    }

    public Long getEnqueteId() {
        return enqueteId;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getPergunta() {
        return pergunta;
    }

    public StatusEnquete getStatus() {
        return status;
    }

    public Integer getTotalVotos() {
        return totalVotos;
    }

    public String getVencedor() {
        return vencedor;
    }

    public List<OpcaoResultadoResponse> getOpcoes() {
        return opcoes;
    }
}