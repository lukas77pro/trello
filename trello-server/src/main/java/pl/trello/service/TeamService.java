package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.model.Team;
import pl.trello.model.User;
import pl.trello.repository.TeamRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {

    private TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public Team getById(String id) throws NotFoundException {
        return teamRepository.findById(id).orElseThrow(() -> new NotFoundException("Team not found"));
    }

    public Team create(String name, User user) {
        return teamRepository.save(Team.builder()
                .name(name)
                .creator(user)
                .members(new ArrayList<>())
                .build());
    }

    public List<Team> getAllForUser(User user) {
        return teamRepository.findAllByCreatorOrMembersContaining(user, user);
    }
}
