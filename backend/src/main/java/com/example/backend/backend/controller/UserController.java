package com.example.backend.backend.controller;

import com.example.backend.backend.model.RatingForm;
import com.example.backend.backend.model.Recipe;
import com.example.backend.backend.model.User;
import com.example.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        if (userService.isEmailAlreadyTaken(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken");
        }
        userService.addUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("signin")
    public ResponseEntity<String> signIn(@RequestBody User user) {
        try {
            User validatedUser = userService.checkLogin(user.getEmail(), user.getPassword());
            return ResponseEntity.ok("Login successful");
        } catch (RuntimeException e) {
            // Return unauthorized if login fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    @GetMapping("cards")
    public List<Recipe> getCards() {
        System.out.println("hello");
        return userService.getAllCardData();
    }
    @GetMapping("cards/{id}")
    public Optional<Recipe> getIdCard(@PathVariable("id") int id) {
        return userService.getIdData(id);
    }

    @PostMapping("/submit")
    public String submitRating(@RequestBody RatingForm ratingForm) {
        System.out.println("Received Rating: " + ratingForm);  // Log the received object
        userService.saveRating(ratingForm);
        return "Rating submitted successfully!";
    }

    @GetMapping("/comments/{recipeId}")
    public List<RatingForm> getComments(@PathVariable("recipeId") int recipeId) {
        return userService.getAllComments(recipeId);
    }
}
