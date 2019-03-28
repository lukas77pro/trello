package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.model.Board;
import pl.trello.model.User;
import pl.trello.service.BoardService;

import java.util.List;

@RestController
@RequestMapping("boards")
public class BoardRestController {

    private BoardService boardService;

    public BoardRestController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public List<Board> getAll(@AuthenticationPrincipal User user) {
        return boardService.getAll(user.getId());
    }

    @GetMapping("{id}")
    public Board getById(@PathVariable String id) throws NotFoundException {
        return boardService.getById(id);
    }

    @PostMapping
    public Board create(@RequestBody String name, @AuthenticationPrincipal User user) throws AlreadyExistsException {
        return boardService.create(name, user.getId());
    }

    @PutMapping("{id}")
    public Board update(@PathVariable String id, @RequestBody Board board) throws NotFoundException {
        return boardService.update(id, board);
    }

    @PutMapping("move")
    public void move(@RequestParam int previousIndex, @RequestParam int currentIndex, @AuthenticationPrincipal User user) {
        boardService.move(previousIndex, currentIndex, user.getId());
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        boardService.delete(id);
    }
}
