package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Table;

public interface TableRepository extends MongoRepository<Table, String> {
}
