package com.brunno.votelive.dto;

import com.brunno.votelive.entity.StatusEnquete;

public class StatusEnqueteResumoResponse {

    private StatusEnquete status;
    private Long quantidade;

    public StatusEnqueteResumoResponse(StatusEnquete status, Long quantidade) {
        this.status = status;
        this.quantidade = quantidade;
    }

    public StatusEnquete getStatus() {
        return status;
    }

    public Long getQuantidade() {
        return quantidade;
    }
}