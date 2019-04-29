package pl.trello.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.core.UserData;
import pl.trello.model.Authority;
import pl.trello.model.User;
import pl.trello.repository.AuthorityRepository;
import pl.trello.repository.UserRepository;

import java.util.Collections;

@Service
public class UserService {

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getById(String userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public void create(UserData userData) throws AlreadyExistsException, NotFoundException {
        if (userRepository.existsByUsername(userData.getUsername())) {
            throw new AlreadyExistsException("User with username '" + userData.getUsername() + "' already exists");
        } else if (userRepository.existsByEmail(userData.getEmail())) {
            throw new AlreadyExistsException("User with email '" + userData.getEmail() + "' already exists");
        }
        userRepository.save(build(userData));
    }

    private User build(UserData userData) throws NotFoundException {
        return User.builder()
            .username(userData.getUsername())
            .email(userData.getEmail())
            .password(passwordEncoder.encode(userData.getPassword()))
            .authorities(Collections.singleton(getAuthority("USER")))
            .build();
    }

    private Authority getAuthority(String authority) throws NotFoundException {
        return authorityRepository.findByAuthority(authority)
                .orElseThrow(() -> new NotFoundException("Authority not found"));
    }
}
