package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Authority;
import pl.trello.model.User;
import pl.trello.repository.AuthorityRepository;
import pl.trello.repository.UserRepository;

import java.util.Collections;

@RestController
@RequestMapping("user")
public class UserRestController {

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    public UserRestController(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public void create(@RequestBody User user) throws NotFoundException {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAuthorities(Collections.singleton(getAuthority("USER")));
        userRepository.save(user);
    }

    @GetMapping
    public User login(@AuthenticationPrincipal User user) {
        user.setPassword(null);
        return user;
    }

    private Authority getAuthority(String authority) throws NotFoundException {
        return authorityRepository.findByAuthority(authority)
                .orElseThrow(() -> new NotFoundException("Authority not found"));
    }
}
