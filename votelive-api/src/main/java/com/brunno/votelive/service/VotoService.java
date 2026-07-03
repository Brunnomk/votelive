package com.brunno.votelive.service;

import com.brunno.votelive.dto.ResultadoEnqueteResponse;
import com.brunno.votelive.dto.VotarRequest;
import com.brunno.votelive.entity.Enquete;
import com.brunno.votelive.entity.OpcaoVoto;
import com.brunno.votelive.entity.StatusEnquete;
import com.brunno.votelive.entity.Usuario;
import com.brunno.votelive.entity.Voto;
import com.brunno.votelive.repository.EnqueteRepository;
import com.brunno.votelive.repository.OpcaoVotoRepository;
import com.brunno.votelive.repository.UsuarioRepository;
import com.brunno.votelive.repository.VotoRepository;
import jakarta.transaction.Transactional;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class VotoService {

    private final VotoRepository votoRepository;
    private final UsuarioRepository usuarioRepository;
    private final EnqueteRepository enqueteRepository;
    private final OpcaoVotoRepository opcaoVotoRepository;
    private final EnqueteService enqueteService;
    private final SimpMessagingTemplate messagingTemplate;

    public VotoService(
            VotoRepository votoRepository,
            UsuarioRepository usuarioRepository,
            EnqueteRepository enqueteRepository,
            OpcaoVotoRepository opcaoVotoRepository,
            EnqueteService enqueteService,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.votoRepository = votoRepository;
        this.usuarioRepository = usuarioRepository;
        this.enqueteRepository = enqueteRepository;
        this.opcaoVotoRepository = opcaoVotoRepository;
        this.enqueteService = enqueteService;
        this.messagingTemplate = messagingTemplate;
    }

    @Transactional
    public Voto votar(Long enqueteId, VotarRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        Enquete enquete = enqueteRepository.findById(enqueteId)
                .orElseThrow(() -> new RuntimeException("Enquete não encontrada."));

        OpcaoVoto opcao = opcaoVotoRepository.findById(request.getOpcaoId())
                .orElseThrow(() -> new RuntimeException("Opção de voto não encontrada."));

        if (enquete.getStatus() != StatusEnquete.ABERTA) {
            throw new RuntimeException("Não é possível votar em uma enquete que não está aberta.");
        }

        if (!opcao.getEnquete().getId().equals(enquete.getId())) {
            throw new RuntimeException("A opção escolhida não pertence a esta enquete.");
        }

        boolean usuarioJaVotou = votoRepository.existsByUsuarioAndEnquete(usuario, enquete);

        if (usuarioJaVotou) {
            throw new RuntimeException("Este usuário já votou nesta enquete.");
        }

        Voto voto = new Voto(usuario, enquete, opcao);

        opcao.incrementarVoto();
        opcaoVotoRepository.save(opcao);

        Voto votoSalvo = votoRepository.save(voto);

        ResultadoEnqueteResponse resultadoAtualizado =
                enqueteService.buscarResultado(enquete.getId());

        messagingTemplate.convertAndSend(
                "/topic/enquetes/" + enquete.getId() + "/resultado",
                resultadoAtualizado
        );

        messagingTemplate.convertAndSend(
                "/topic/dashboard/atualizar",
                "ATUALIZAR"
        );

        return votoSalvo;
    }
}