package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.model.User;
import pl.trello.service.UserService;

@RestController
@RequestMapping("user")
public class UserRestController {

    private UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void create(@RequestBody User user) throws NotFoundException, AlreadyExistsException {
        userService.create(user);
    }

    @GetMapping
    public User login(@AuthenticationPrincipal User user) {
        return user;
    }
}
