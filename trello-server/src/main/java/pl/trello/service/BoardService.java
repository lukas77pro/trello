package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.core.Utils;
import pl.trello.model.Board;
import pl.trello.repository.BoardRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        return boardRepository.save(Board.builder()
                .name(name).userId(userId).cardLists(new ArrayList<>()).order(boardRepository.count()).build());
    }

    public void move(int previousIndex, int currentIndex, String userId) {
        List<Board> boards = boardRepository.findAllByUserIdOrderByOrder(userId);
        boardRepository.saveAll(Utils.move(boards, previousIndex, currentIndex));
    }

    public List<Board> getAll(String userId) {
        return boardRepository.findAllByUserIdOrderByOrder(userId).stream()
                .peek(board -> board.setCardLists(null))
                .collect(Collectors.toList());
    }

    public Board getById(String id) throws NotFoundException {
        return ordered(boardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Board with ID '" + id + "' not found")));
    }

    private Board ordered(Board board) {
        board.setCardLists(board.getCardLists().stream()
                .sorted()
                .peek(cardList -> cardList.setCards(cardList.getCards().stream()
                        .sorted()
                        .collect(Collectors.toList())))
                .collect(Collectors.toList()));
        return board;
    }

    public Board update(String id, Board board) throws NotFoundException {
        if (boardRepository.existsById(id)) {
            board.setId(id);
            return boardRepository.save(board);
        }
        throw new NotFoundException("Board with ID '" + board.getId() + "' not found");
    }

    public void delete(String id) {
        boardRepository.deleteById(id);
    }
}
