package com.brunno.votelive.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CriarEnqueteRequest {

    @NotBlank(message = "O título é obrigatório")
    private String titulo;

    @NotBlank(message = "A pergunta é obrigatória")
    private String pergunta;

    @NotNull(message = "O ID do usuário é obrigatório")
    private Long usuarioId;

    @NotEmpty(message = "A enquete precisa ter pelo menos uma opção")
    private List<String> opcoes;

    public String getTitulo() {
        return titulo;
    }

    public String getPergunta() {
        return pergunta;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public List<String> getOpcoes() {
        return opcoes;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setPergunta(String pergunta) {
        this.pergunta = pergunta;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public void setOpcoes(List<String> opcoes) {
        this.opcoes = opcoes;
    }
}