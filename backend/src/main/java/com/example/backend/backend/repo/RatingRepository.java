package com.example.backend.backend.repo;

import com.example.backend.backend.model.RatingForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<RatingForm, Long> {
    List<RatingForm> findByRecipeId(int recipeId);
}
