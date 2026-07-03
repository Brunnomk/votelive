package com.brunno.votelive.repository;

import com.brunno.votelive.entity.Enquete;
import com.brunno.votelive.entity.StatusEnquete;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnqueteRepository extends JpaRepository<Enquete, Long> {

    List<Enquete> findByStatus(StatusEnquete status);
}