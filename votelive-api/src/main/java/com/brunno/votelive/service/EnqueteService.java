package com.brunno.votelive.service;

import com.brunno.votelive.dto.CriarEnqueteRequest;
import com.brunno.votelive.dto.OpcaoResultadoResponse;
import com.brunno.votelive.dto.ResultadoEnqueteResponse;
import com.brunno.votelive.entity.Enquete;
import com.brunno.votelive.entity.OpcaoVoto;
import com.brunno.votelive.entity.StatusEnquete;
import com.brunno.votelive.entity.Usuario;
import com.brunno.votelive.repository.EnqueteRepository;
import com.brunno.votelive.repository.OpcaoVotoRepository;
import com.brunno.votelive.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class EnqueteService {

    private final EnqueteRepository enqueteRepository;
    private final OpcaoVotoRepository opcaoVotoRepository;
    private final UsuarioRepository usuarioRepository;

    public EnqueteService(
            EnqueteRepository enqueteRepository,
            OpcaoVotoRepository opcaoVotoRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.enqueteRepository = enqueteRepository;
        this.opcaoVotoRepository = opcaoVotoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Enquete criarEnquete(CriarEnqueteRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        Enquete enquete = new Enquete(
                request.getTitulo(),
                request.getPergunta(),
                usuario
        );

        Enquete enqueteSalva = enqueteRepository.save(enquete);

        for (String textoOpcao : request.getOpcoes()) {
            OpcaoVoto opcao = new OpcaoVoto(textoOpcao, enqueteSalva);
            opcaoVotoRepository.save(opcao);
        }

        return enqueteSalva;
    }

    public List<Enquete> listarEnquetes() {
        return enqueteRepository.findAll();
    }

    public Enquete buscarPorId(Long id) {
        return enqueteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquete não encontrada."));
    }

    public ResultadoEnqueteResponse buscarResultado(Long enqueteId) {
        Enquete enquete = buscarPorId(enqueteId);

        List<OpcaoVoto> opcoes = opcaoVotoRepository.findByEnquete(enquete);

        int totalVotos = opcoes.stream()
                .mapToInt(OpcaoVoto::getQuantidadeVotos)
                .sum();

        String vencedor = totalVotos == 0
                ? "Sem votos"
                : opcoes.stream()
                .max(Comparator.comparingInt(OpcaoVoto::getQuantidadeVotos))
                .map(OpcaoVoto::getTexto)
                .orElse("Sem votos");

        List<OpcaoResultadoResponse> opcoesResultado = opcoes.stream()
                .sorted(Comparator.comparingInt(OpcaoVoto::getQuantidadeVotos).reversed())
                .map(opcao -> {
                    double percentual = totalVotos == 0
                            ? 0.0
                            : (opcao.getQuantidadeVotos() * 100.0) / totalVotos;

                    return new OpcaoResultadoResponse(
                            opcao.getId(),
                            opcao.getTexto(),
                            opcao.getQuantidadeVotos(),
                            percentual
                    );
                })
                .toList();

        return new ResultadoEnqueteResponse(
                enquete.getId(),
                enquete.getTitulo(),
                enquete.getPergunta(),
                enquete.getStatus(),
                totalVotos,
                vencedor,
                opcoesResultado
        );
    }

    public Enquete encerrarEnquete(Long id) {
        Enquete enquete = buscarPorId(id);

        if (enquete.getStatus() != StatusEnquete.ABERTA) {
            throw new RuntimeException("A enquete não está aberta.");
        }

        enquete.setStatus(StatusEnquete.ENCERRADA);
        enquete.setDataEncerramento(LocalDateTime.now());

        return enqueteRepository.save(enquete);
    }
}