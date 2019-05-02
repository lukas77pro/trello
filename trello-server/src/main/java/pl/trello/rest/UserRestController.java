package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.core.UserData;
import pl.trello.model.User;
import pl.trello.service.UserService;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserRestController {

    private UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void create(@RequestBody UserData userData) throws NotFoundException, AlreadyExistsException {
        userService.create(userData);
    }

    @GetMapping("{id}")
    public User getById(@PathVariable String id) throws NotFoundException {
        return userService.getById(id);
    }

    @GetMapping("search")
    public List<User> search(@RequestParam String pattern) {
        return userService.search(pattern);
    }

    @GetMapping
    public User login(@AuthenticationPrincipal User user) {
        return user;
    }
}
