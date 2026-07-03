package com.brunno.votelive.controller;

import com.brunno.votelive.dto.CriarEnqueteRequest;
import com.brunno.votelive.dto.ResultadoEnqueteResponse;
import com.brunno.votelive.entity.Enquete;
import com.brunno.votelive.service.EnqueteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquetes")
public class EnqueteController {

    private final EnqueteService enqueteService;

    public EnqueteController(EnqueteService enqueteService) {
        this.enqueteService = enqueteService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Enquete criarEnquete(@RequestBody @Valid CriarEnqueteRequest request) {
        return enqueteService.criarEnquete(request);
    }

    @GetMapping
    public List<Enquete> listarEnquetes() {
        return enqueteService.listarEnquetes();
    }

    @GetMapping("/{id}")
    public Enquete buscarEnquetePorId(@PathVariable Long id) {
        return enqueteService.buscarPorId(id);
    }

    @GetMapping("/{id}/resultado")
    public ResultadoEnqueteResponse buscarResultado(@PathVariable Long id) {
        return enqueteService.buscarResultado(id);
    }

    @PatchMapping("/{id}/encerrar")
    public Enquete encerrarEnquete(@PathVariable Long id) {
        return enqueteService.encerrarEnquete(id);
    }
}