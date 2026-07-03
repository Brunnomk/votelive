package com.brunno.votelive.dto;

public class DashboardResumoResponse {

    private Long totalUsuarios;
    private Long totalEnquetes;
    private Long totalVotos;
    private Long enquetesAbertas;
    private Long enquetesEncerradas;

    public DashboardResumoResponse(
            Long totalUsuarios,
            Long totalEnquetes,
            Long totalVotos,
            Long enquetesAbertas,
            Long enquetesEncerradas
    ) {
        this.totalUsuarios = totalUsuarios;
        this.totalEnquetes = totalEnquetes;
        this.totalVotos = totalVotos;
        this.enquetesAbertas = enquetesAbertas;
        this.enquetesEncerradas = enquetesEncerradas;
    }

    public Long getTotalUsuarios() {
        return totalUsuarios;
    }

    public Long getTotalEnquetes() {
        return totalEnquetes;
    }

    public Long getTotalVotos() {
        return totalVotos;
    }

    public Long getEnquetesAbertas() {
        return enquetesAbertas;
    }

    public Long getEnquetesEncerradas() {
        return enquetesEncerradas;
    }
}