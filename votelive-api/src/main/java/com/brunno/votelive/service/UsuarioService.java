package com.brunno.votelive.service;

import com.brunno.votelive.dto.CriarUsuarioRequest;
import com.brunno.votelive.entity.Usuario;
import com.brunno.votelive.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario criarUsuario(CriarUsuarioRequest request) {
        boolean emailJaExiste = usuarioRepository.existsByEmail(request.getEmail());

        if (emailJaExiste) {
            throw new RuntimeException("Já existe um usuário cadastrado com este email.");
        }

        Usuario usuario = new Usuario(request.getNome(), request.getEmail());

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
    }
}
