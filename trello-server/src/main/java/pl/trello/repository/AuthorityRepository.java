package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Authority;

import java.util.Optional;

public interface AuthorityRepository extends MongoRepository<Authority, String> {

    Optional<Authority> findByAuthority(String authority);
}
