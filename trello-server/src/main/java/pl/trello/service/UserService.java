package pl.trello.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
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
        return userRepository.findById(userId).map(user -> {
            user.setPassword(null);
            return user;
        }).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public void create(User user) throws AlreadyExistsException, NotFoundException {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new AlreadyExistsException("User with username '" + user.getUsername() + "' already exists");
        } else if (userRepository.existsByEmail(user.getEmail())) {
            throw new AlreadyExistsException("User with email '" + user.getEmail() + "' already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAuthorities(Collections.singleton(getAuthority("USER")));
        userRepository.save(user);
    }

    private Authority getAuthority(String authority) throws NotFoundException {
        return authorityRepository.findByAuthority(authority)
                .orElseThrow(() -> new NotFoundException("Authority not found"));
    }
}
