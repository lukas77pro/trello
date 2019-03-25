package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.model.Board;
import pl.trello.model.User;
import pl.trello.repository.BoardRepository;
import pl.trello.service.BoardService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("boards")
public class BoardRestController {

    private BoardRepository boardRepository;
    private BoardService boardService;

    public BoardRestController(BoardRepository boardRepository, BoardService boardService) {
        this.boardRepository = boardRepository;
        this.boardService = boardService;
    }

    @GetMapping
    public List<Board> getAll(@AuthenticationPrincipal User user) {
        return boardRepository.findAllByUserIdOrderByOrder(user.getId()).stream()
                .peek(board -> board.setCardLists(null))
                .collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public Board getById(@PathVariable String id) throws NotFoundException {
        return boardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Board with ID '" + id + "' not found"));
    }

    @PostMapping
    public Board create(@RequestBody String name, @AuthenticationPrincipal User user) throws AlreadyExistsException {
        return boardService.create(name, user.getId());
    }

    @PutMapping("{id}")
    public Board update(@PathVariable String id, @RequestBody Board board) throws NotFoundException {
        if (boardRepository.existsById(id)) {
            board.setId(id);
            return boardRepository.save(board);
        }
        throw new NotFoundException("Board with ID '" + board.getId() + "' not found");
    }

    @PutMapping("move")
    public void move(@RequestParam int previousIndex, @RequestParam int currentIndex, @AuthenticationPrincipal User user) {
        boardService.move(previousIndex, currentIndex, user.getId());
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        boardRepository.deleteById(id);
    }
}
