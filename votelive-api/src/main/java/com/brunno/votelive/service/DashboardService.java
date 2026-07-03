package com.brunno.votelive.service;

import com.brunno.votelive.dto.DashboardResumoResponse;
import com.brunno.votelive.dto.RankingOpcaoResponse;
import com.brunno.votelive.dto.StatusEnqueteResumoResponse;
import com.brunno.votelive.entity.OpcaoVoto;
import com.brunno.votelive.entity.StatusEnquete;
import com.brunno.votelive.repository.EnqueteRepository;
import com.brunno.votelive.repository.OpcaoVotoRepository;
import com.brunno.votelive.repository.UsuarioRepository;
import com.brunno.votelive.repository.VotoRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class DashboardService {

    private final UsuarioRepository usuarioRepository;
    private final EnqueteRepository enqueteRepository;
    private final VotoRepository votoRepository;
    private final OpcaoVotoRepository opcaoVotoRepository;

    public DashboardService(
            UsuarioRepository usuarioRepository,
            EnqueteRepository enqueteRepository,
            VotoRepository votoRepository,
            OpcaoVotoRepository opcaoVotoRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.enqueteRepository = enqueteRepository;
        this.votoRepository = votoRepository;
        this.opcaoVotoRepository = opcaoVotoRepository;
    }

    public DashboardResumoResponse buscarResumo() {
        Long totalUsuarios = usuarioRepository.count();
        Long totalEnquetes = enqueteRepository.count();
        Long totalVotos = votoRepository.count();

        Long enquetesAbertas = (long) enqueteRepository.findByStatus(StatusEnquete.ABERTA).size();
        Long enquetesEncerradas = (long) enqueteRepository.findByStatus(StatusEnquete.ENCERRADA).size();

        return new DashboardResumoResponse(
                totalUsuarios,
                totalEnquetes,
                totalVotos,
                enquetesAbertas,
                enquetesEncerradas
        );
    }

    public List<StatusEnqueteResumoResponse> buscarStatusEnquetes() {
        Long abertas = (long) enqueteRepository.findByStatus(StatusEnquete.ABERTA).size();
        Long encerradas = (long) enqueteRepository.findByStatus(StatusEnquete.ENCERRADA).size();
        Long canceladas = (long) enqueteRepository.findByStatus(StatusEnquete.CANCELADA).size();

        return List.of(
                new StatusEnqueteResumoResponse(StatusEnquete.ABERTA, abertas),
                new StatusEnqueteResumoResponse(StatusEnquete.ENCERRADA, encerradas),
                new StatusEnqueteResumoResponse(StatusEnquete.CANCELADA, canceladas)
        );
    }

    public List<RankingOpcaoResponse> buscarRankingOpcoes() {
        return opcaoVotoRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(OpcaoVoto::getQuantidadeVotos).reversed())
                .map(opcao -> new RankingOpcaoResponse(
                        opcao.getId(),
                        opcao.getTexto(),
                        opcao.getQuantidadeVotos(),
                        opcao.getEnquete().getTitulo()
                ))
                .toList();
    }
}