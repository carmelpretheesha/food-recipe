package com.example.backend.backend.service;


import com.example.backend.backend.model.User;
import com.example.backend.backend.model.UserPrincipal;
import com.example.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserConfig implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDetail=repo.findByEmail(email);

        if (userDetail == null) {
            throw new UsernameNotFoundException(email);  // Exception if email is not found
        }
        return new UserPrincipal(userDetail);
    }
}
