package com.example.backend.backend.service;

import com.example.backend.backend.model.RatingForm;
import com.example.backend.backend.model.Recipe;
import com.example.backend.backend.model.User;
import com.example.backend.backend.repo.CardRepo;
import com.example.backend.backend.repo.RatingRepository;
import com.example.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CardRepo cardRepo;
    @Autowired
    private RatingRepository ratingRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public void addUser(User userDetail) {
        userDetail.setPassword(bCryptPasswordEncoder.encode(userDetail.getPassword()));
        userRepo.save(userDetail);
    }

    // Method to check login credentials
    public User checkLogin(String email, String password) {
        User userDetail = userRepo.findByEmail(email);
        if (userDetail != null && bCryptPasswordEncoder.matches(password, userDetail.getPassword())) {
            return userDetail;
        }
        throw new RuntimeException("Invalid login credentials");
    }

    // Method to check if the email is already taken
    public boolean isEmailAlreadyTaken(String email) {
        return userRepo.findByEmail(email) != null;
    }

    public List<Recipe> getAllCardData() {
        return cardRepo.findAll();
    }

    public Optional<Recipe> getIdData(int id) {
        return cardRepo.findById(id);

    }

    public void saveRating(RatingForm ratingForm) {
        ratingRepository.save(ratingForm);
    }

    public List<RatingForm> getAllComments(int recipeId) {
        return ratingRepository.findByRecipeId(recipeId);
    }
}
