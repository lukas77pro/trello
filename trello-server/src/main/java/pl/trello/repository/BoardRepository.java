package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Board;

import java.util.List;

public interface BoardRepository extends MongoRepository<Board, String> {

    boolean existsByTitleAndUserId(String title, String userId);

    long countByUserId(String userId);

    List<Board> findAllByUserIdOrderByOrder(String userId);

    List<Board> findAllByUserId(String userId);
}
