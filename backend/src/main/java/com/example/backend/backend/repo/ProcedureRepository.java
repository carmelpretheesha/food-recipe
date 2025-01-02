package com.example.backend.backend.repo;

import com.example.backend.backend.model.Procedures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcedureRepository extends JpaRepository<Procedures, Long> {
}
