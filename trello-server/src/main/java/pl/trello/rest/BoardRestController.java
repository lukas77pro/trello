package pl.trello.rest;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private BoardService boardService;

    @GetMapping
    public List<Board> getAll(@AuthenticationPrincipal User user, @RequestParam String teamId) {
        return teamId.isEmpty() ? boardService.getAllForUser(user.getId()) : boardService.getAllForTeam(teamId);
    }

    @GetMapping("{id}")
    public Board getById(@PathVariable String id) throws NotFoundException {
        return boardService.getById(id);
    }

    @PostMapping
    public Board create(@RequestBody String title, @RequestParam String teamId, @AuthenticationPrincipal User user) throws AlreadyExistsException {
        return teamId.isEmpty() ? boardService.createForUser(title, user.getId()) : boardService.createForTeam(title, teamId);
    }


    @PutMapping("move")
    public void move(@RequestParam int previousIndex, @RequestParam int currentIndex, @RequestParam String teamId, @AuthenticationPrincipal User user) {
        if (teamId.isEmpty()) {
            boardService.moveForUser(previousIndex, currentIndex, user.getId());
        } else {
            boardService.moveForTeam(previousIndex, currentIndex, teamId);
        }
    }

    @PutMapping("{id}")
    public Board update(@PathVariable String id, @RequestBody Board board) throws NotFoundException {
        return boardService.update(id, board);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) throws NotFoundException {
        boardService.delete(id);
    }
}
