package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Board;

import java.util.List;

public interface BoardRepository extends MongoRepository<Board, String> {

    boolean existsByName(String name);

    List<Board> findAllByUserIdOrderByOrder(String userId);
}
