package com.brunno.votelive.controller;

import com.brunno.votelive.dto.CriarUsuarioRequest;
import com.brunno.votelive.entity.Usuario;
import com.brunno.votelive.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criarUsuario(@RequestBody @Valid CriarUsuarioRequest request) {
        return usuarioService.criarUsuario(request);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario buscarUsuarioPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }
}