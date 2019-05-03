package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Team;
import pl.trello.model.User;
import pl.trello.service.TeamService;

import java.util.List;

@RestController
@RequestMapping("teams")
public class TeamRestController {

    private TeamService teamService;

    public TeamRestController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("{id}")
    public Team getById(@PathVariable String id) throws NotFoundException {
        return teamService.getById(id);
    }

    @PutMapping("{id}/invitations/add")
    public void addInvitation(@PathVariable String id, @RequestParam String userId) throws NotFoundException {
        teamService.addInvitation(id, userId);
    }

    @PutMapping("{id}/invitations/remove")
    public void removeInvitation(@PathVariable String id, @RequestParam String userId) throws NotFoundException {
        teamService.removeInvitation(id, userId);
    }

    @PostMapping
    public Team create(@AuthenticationPrincipal User user, @RequestBody String name) {
        return teamService.create(name, user);
    }

    @GetMapping
    public List<Team> getAllForUser(@AuthenticationPrincipal User user) {
        return teamService.getAllForUser(user);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        teamService.delete(id);
    }
}
