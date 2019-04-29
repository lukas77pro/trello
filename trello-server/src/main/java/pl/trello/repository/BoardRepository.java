package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.trello.model.Board;

import java.util.List;

@Repository
public interface BoardRepository extends MongoRepository<Board, String> {

    boolean existsByTitleAndUserId(String title, String userId);

    boolean existsByTitleAndTeamId(String title, String teamId);

    long countByUserId(String userId);

    long countByTeamId(String teamId);

    List<Board> findAllByUserIdOrderByOrder(String userId);

    List<Board> findAllByTeamIdOrderByOrder(String teamId);

    List<Board> findAllByUserId(String userId);

    List<Board> findAllByTeamId(String teamId);
}
