package com.brunno.votelive.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enquetes")
public class Enquete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String pergunta;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusEnquete status;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_encerramento")
    private LocalDateTime dataEncerramento;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Enquete() {
    }

    public Enquete(String titulo, String pergunta, Usuario usuario) {
        this.titulo = titulo;
        this.pergunta = pergunta;
        this.usuario = usuario;
        this.status = StatusEnquete.ABERTA;
        this.dataCriacao = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.status == null) {
            this.status = StatusEnquete.ABERTA;
        }

        if (this.dataCriacao == null) {
            this.dataCriacao = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
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

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public LocalDateTime getDataEncerramento() {
        return dataEncerramento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setPergunta(String pergunta) {
        this.pergunta = pergunta;
    }

    public void setStatus(StatusEnquete status) {
        this.status = status;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setDataEncerramento(LocalDateTime dataEncerramento) {
        this.dataEncerramento = dataEncerramento;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}