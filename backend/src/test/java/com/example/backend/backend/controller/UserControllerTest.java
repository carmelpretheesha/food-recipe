package com.example.backend.backend.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.backend.backend.model.RatingForm;
import com.example.backend.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class RatingControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Initialize mocks
    }

    @Test
    void testSubmitRating() {
        // Arrange
        RatingForm ratingForm = new RatingForm();
        ratingForm.setName("John Doe");
        ratingForm.setEmail("john.doe@example.com");
        ratingForm.setRating(5);
        ratingForm.setDescription("Excellent!");
        ratingForm.setRecipeId(1L);

        doNothing().when(userService).saveRating(ratingForm);  // Mock the service call

        // Act
        String response = userController.submitRating(ratingForm);

        // Assert
        assertEquals("Rating submitted successfully!", response);
        verify(userService, times(1)).saveRating(ratingForm);  // Verify the interaction
    }
}
