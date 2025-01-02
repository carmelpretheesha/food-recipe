package com.example.backend.backend.repo;

import com.example.backend.backend.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends JpaRepository<Recipe,Integer> {

}
