package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.model.Board;
import pl.trello.repository.BoardRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class BoardService {

    private BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board create(String name, String userId) throws AlreadyExistsException {
        if (boardRepository.existsByName(name)) {
            throw new AlreadyExistsException("Board with '" + name + "' already exists");
        }
        return boardRepository.save(
                Board.builder().name(name).userId(userId).cardLists(new ArrayList<>()).order(boardRepository.count()).build());
    }

    public void move(int previousIndex, int currentIndex, String userId) {
        List<Board> boards = boardRepository.findAllByUserIdOrderByOrder(userId);
        Board board = boards.remove(previousIndex);
        boards.add(currentIndex, board);
        IntStream.range(0, boards.size()).forEach(index -> boards.get(index).setOrder(index));
        boardRepository.saveAll(boards);
    }
}
