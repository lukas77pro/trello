package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    List<User> findAllByUsernameStartsWithIgnoreCase(String pattern);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
