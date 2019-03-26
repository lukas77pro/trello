package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.model.Board;
import pl.trello.model.CardList;
import pl.trello.repository.BoardRepository;

import java.util.ArrayList;

@Service
public class CardListService {

    private BoardRepository boardRepository;

    public CardListService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public CardList create(String name, String boardId) throws NotFoundException {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new NotFoundException("Board with id '" + boardId + "' not found"));
        CardList cardList = CardList.builder().name(name).cards(new ArrayList<>()).build();
        board.getCardLists().add(cardList);
        boardRepository.save(board);
        return cardList;
    }
}
