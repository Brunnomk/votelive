package com.brunno.votelive.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "opcoes_voto")
public class OpcaoVoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String texto;

    @Column(name = "quantidade_votos", nullable = false)
    private Integer quantidadeVotos;

    @ManyToOne
    @JoinColumn(name = "enquete_id", nullable = false)
    private Enquete enquete;

    public OpcaoVoto() {
    }

    public OpcaoVoto(String texto, Enquete enquete) {
        this.texto = texto;
        this.enquete = enquete;
        this.quantidadeVotos = 0;
    }

    @PrePersist
    public void prePersist() {
        if (this.quantidadeVotos == null) {
            this.quantidadeVotos = 0;
        }
    }

    public Long getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public Integer getQuantidadeVotos() {
        return quantidadeVotos;
    }

    public Enquete getEnquete() {
        return enquete;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setQuantidadeVotos(Integer quantidadeVotos) {
        this.quantidadeVotos = quantidadeVotos;
    }

    public void setEnquete(Enquete enquete) {
        this.enquete = enquete;
    }

    public void incrementarVoto() {
        this.quantidadeVotos++;
    }
}