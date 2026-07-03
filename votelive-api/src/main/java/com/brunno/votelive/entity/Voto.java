package com.brunno.votelive.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "votos",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_usuario_enquete",
                        columnNames = {"usuario_id", "enquete_id"}
                )
        }
)
public class Voto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_voto", nullable = false)
    private LocalDateTime dataVoto;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "enquete_id", nullable = false)
    private Enquete enquete;

    @ManyToOne
    @JoinColumn(name = "opcao_id", nullable = false)
    private OpcaoVoto opcao;

    public Voto() {
    }

    public Voto(Usuario usuario, Enquete enquete, OpcaoVoto opcao) {
        this.usuario = usuario;
        this.enquete = enquete;
        this.opcao = opcao;
        this.dataVoto = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.dataVoto == null) {
            this.dataVoto = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDataVoto() {
        return dataVoto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Enquete getEnquete() {
        return enquete;
    }

    public OpcaoVoto getOpcao() {
        return opcao;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDataVoto(LocalDateTime dataVoto) {
        this.dataVoto = dataVoto;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setEnquete(Enquete enquete) {
        this.enquete = enquete;
    }

    public void setOpcao(OpcaoVoto opcao) {
        this.opcao = opcao;
    }
}