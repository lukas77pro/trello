package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Team;
import pl.trello.model.User;

import java.util.List;

public interface TeamRepository extends MongoRepository<Team, String> {

    List<Team> findAllByCreatorOrMembersContaining(User creator, User member);

    List<Team> findAllByInvitedUsersContaining(User user);
}
