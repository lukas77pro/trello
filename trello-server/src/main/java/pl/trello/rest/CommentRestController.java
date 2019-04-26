package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Comment;
import pl.trello.model.User;
import pl.trello.service.CommentService;

@RestController
@RequestMapping("boards/{boardId}/cardlists/{cardListId}/cards/{cardId}/comments")
public class CommentRestController {

    private CommentService commentService;

    public CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public Comment create(@PathVariable String boardId, @PathVariable String cardListId, @PathVariable String cardId,
                          @RequestBody String content, @AuthenticationPrincipal User user) throws NotFoundException {
        return commentService.create(boardId, cardListId, cardId, content, user);
    }
}
