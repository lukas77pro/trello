package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.model.Team;
import pl.trello.model.User;
import pl.trello.repository.TeamRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    private TeamRepository teamRepository;
    private UserService userService;

    public TeamService(TeamRepository teamRepository, UserService userService) {
        this.teamRepository = teamRepository;
        this.userService = userService;
    }

    public Team getById(String id) throws NotFoundException {
        return teamRepository.findById(id).orElseThrow(() -> new NotFoundException("Team not found"));
    }

    public Team create(String name, User user) {
        return teamRepository.save(Team.builder()
                .name(name)
                .creator(user)
                .members(new ArrayList<>())
                .invitedUsers(new ArrayList<>())
                .build());
    }

    public List<Team> getAllForUser(User user) {
        return teamRepository.findAllByCreatorOrMembersContaining(user, user);
    }

    public void addInvitation(String id, String userId) throws NotFoundException {
        Team team = getById(id);
        team.getInvitedUsers().add(userService.getById(userId));
        teamRepository.save(team);
    }

    public void removeInvitation(String id, String userId) throws NotFoundException {
        Team team = getById(id);
        team.getInvitedUsers().removeIf(user -> user.getId().equals(userId));
        teamRepository.save(team);
    }
}
