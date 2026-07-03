package com.brunno.votelive.controller;

import com.brunno.votelive.dto.VotarRequest;
import com.brunno.votelive.entity.Voto;
import com.brunno.votelive.service.VotoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquetes/{enqueteId}/votos")
public class VotoController {

    private final VotoService votoService;

    public VotoController(VotoService votoService) {
        this.votoService = votoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Voto votar(
            @PathVariable Long enqueteId,
            @RequestBody @Valid VotarRequest request
    ) {
        return votoService.votar(enqueteId, request);
    }
}