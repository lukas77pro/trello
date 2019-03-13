package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.model.Board;
import pl.trello.repository.BoardRepository;

import java.util.ArrayList;

@Service
public class BoardService {

    private BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board create(String name) throws AlreadyExistsException {
        if (boardRepository.existsByName(name)) {
            throw new AlreadyExistsException("Board with '" + name + "' already exists");
        }
        return boardRepository.save(Board.builder().name(name).cardLists(new ArrayList<>()).build());
    }
}
