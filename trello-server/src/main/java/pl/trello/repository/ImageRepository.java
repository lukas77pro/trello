package pl.trello.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.trello.model.Image;

public interface ImageRepository extends MongoRepository<Image, String> {
}
