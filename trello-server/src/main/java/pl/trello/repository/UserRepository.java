package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
