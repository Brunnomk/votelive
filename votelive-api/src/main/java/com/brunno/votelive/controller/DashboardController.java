package com.brunno.votelive.controller;

import com.brunno.votelive.dto.DashboardResumoResponse;
import com.brunno.votelive.dto.RankingOpcaoResponse;
import com.brunno.votelive.dto.StatusEnqueteResumoResponse;
import com.brunno.votelive.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/resumo")
    public DashboardResumoResponse buscarResumo() {
        return dashboardService.buscarResumo();
    }

    @GetMapping("/status-enquetes")
    public List<StatusEnqueteResumoResponse> buscarStatusEnquetes() {
        return dashboardService.buscarStatusEnquetes();
    }

    @GetMapping("/ranking-opcoes")
    public List<RankingOpcaoResponse> buscarRankingOpcoes() {
        return dashboardService.buscarRankingOpcoes();
    }
}