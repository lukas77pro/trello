package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.trello.model.Card;

@Repository
public interface CardRepository extends MongoRepository<Card, String> {
}
