package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.Utils;
import pl.trello.model.Card;
import pl.trello.model.Comment;
import pl.trello.model.User;

import java.util.Date;

@Service
public class CommentService {

    private CardService cardService;

    public CommentService(CardService cardService) {
        this.cardService = cardService;
    }

    public Comment create(String boardId, String cardListId, String cardId, String content, User user) throws NotFoundException {
        Card card = cardService.getById(boardId, cardListId, cardId);
        Comment comment = build(content, user);
        card.getComments().add(comment);
        cardService.update(boardId, cardListId, cardId, card);
        return comment;
    }

    private Comment build(String content, User user) {
        return Comment.builder()
                .id(Utils.generateId())
                .content(content)
                .authorId(user.getId())
                .creationDate(new Date().getTime())
                .build();
    }
}
