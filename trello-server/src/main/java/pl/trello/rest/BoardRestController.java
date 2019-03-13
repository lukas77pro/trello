package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.model.Board;
import pl.trello.repository.BoardRepository;
import pl.trello.service.BoardService;

import java.util.List;

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
    public List<Board> getAll() {
        return boardRepository.findAll();
    }

    @GetMapping("{id}")
    public Board getById(@PathVariable String id) throws NotFoundException {
        return boardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Board with ID '" + id + "' not found"));
    }

    @PostMapping
    public Board create(@RequestBody String name) throws AlreadyExistsException {
        return boardService.create(name);
    }

    @PutMapping("{id}")
    public Board update(@PathVariable String id, @RequestBody Board board) throws NotFoundException {
        if (boardRepository.existsById(id)) {
            board.setId(id);
            return boardRepository.save(board);
        }
        throw new NotFoundException("Board with ID '" + board.getId() + "' not found");
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        boardRepository.deleteById(id);
    }
}
