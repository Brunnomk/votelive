package com.brunno.votelive.dto;

import jakarta.validation.constraints.NotNull;

public class VotarRequest {

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    @NotNull(message = "O ID da opção é obrigatório")
    private Long opcaoId;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public Long getOpcaoId() {
        return opcaoId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public void setOpcaoId(Long opcaoId) {
        this.opcaoId = opcaoId;
    }
}