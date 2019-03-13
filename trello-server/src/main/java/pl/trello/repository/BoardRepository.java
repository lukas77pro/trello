package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Board;

import java.util.Optional;

public interface BoardRepository extends MongoRepository<Board, String> {

    boolean existsByName(String name);
}
