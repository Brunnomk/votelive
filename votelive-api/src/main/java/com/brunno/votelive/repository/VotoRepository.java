package com.brunno.votelive.repository;

import com.brunno.votelive.entity.Enquete;
import com.brunno.votelive.entity.Usuario;
import com.brunno.votelive.entity.Voto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VotoRepository extends JpaRepository<Voto, Long> {

    boolean existsByUsuarioAndEnquete(Usuario usuario, Enquete enquete);
}