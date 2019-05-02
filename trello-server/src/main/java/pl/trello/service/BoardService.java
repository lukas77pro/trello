package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.core.OrderedUtils;
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

    public Board createForUser(String title, String userId) throws AlreadyExistsException {
        if (boardRepository.existsByTitleAndUserId(title, userId)) {
            throw new AlreadyExistsException("Board with '" + title + "' already exists");
        }
        return boardRepository.save(Board.builder()
                .title(title).userId(userId).cardLists(new ArrayList<>()).order(boardRepository.countByUserId(userId)).build());
    }

    public Board createForTeam(String title, String teamId) throws AlreadyExistsException {
        if (boardRepository.existsByTitleAndTeamId(title, teamId)) {
            throw new AlreadyExistsException("Board with '" + title + "' already exists");
        }
        return boardRepository.save(Board.builder()
                .title(title).teamId(teamId).cardLists(new ArrayList<>()).order(boardRepository.countByTeamId(teamId)).build());
    }

    public void moveForUser(int previousIndex, int currentIndex, String userId) {
        List<Board> boards = boardRepository.findAllByUserIdOrderByOrder(userId);
        boardRepository.saveAll(OrderedUtils.move(boards, previousIndex, currentIndex));
    }

    public void moveForTeam(int previousIndex, int currentIndex, String teamId) {
        List<Board> boards = boardRepository.findAllByTeamIdOrderByOrder(teamId);
        boardRepository.saveAll(OrderedUtils.move(boards, previousIndex, currentIndex));
    }

    public List<Board> getAllForUser(String userId) {
        return boardRepository.findAllByUserIdOrderByOrder(userId).stream()
                .peek(board -> board.setCardLists(null))
                .collect(Collectors.toList());
    }

    public List<Board> getAllForTeam(String teamId) {
        return boardRepository.findAllByTeamIdOrderByOrder(teamId).stream()
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

    public void delete(String id) throws NotFoundException {
        Board board = boardRepository.findById(id).orElseThrow(() -> new NotFoundException("Board not found"));
        boardRepository.deleteById(id);
        boardRepository.saveAll(OrderedUtils.reorder(board.getTeamId() == null ?
                boardRepository.findAllByUserId(board.getUserId()) : boardRepository.findAllByTeamId(board.getTeamId())));
    }
}
