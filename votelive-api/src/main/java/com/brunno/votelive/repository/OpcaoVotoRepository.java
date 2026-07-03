package com.brunno.votelive.repository;

import com.brunno.votelive.entity.Enquete;
import com.brunno.votelive.entity.OpcaoVoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OpcaoVotoRepository extends JpaRepository<OpcaoVoto, Long> {

    List<OpcaoVoto> findByEnquete(Enquete enquete);
}