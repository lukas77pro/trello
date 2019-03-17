package pl.trello.rest;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.trello.model.User;
import pl.trello.repository.UserRepository;

@RestController
public class UserRestController {

    private UserRepository userRepository;

    public UserRestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("login")
    public User login(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
