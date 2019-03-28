package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.model.Board;
import pl.trello.model.Card;
import pl.trello.model.CardList;
import pl.trello.repository.BoardRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CardListService {

    private BoardRepository boardRepository;

    public CardListService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public CardList create(String boardId, String name) throws NotFoundException {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new NotFoundException("Board with id '" + boardId + "' not found"));
        CardList cardList = CardList.builder().name(name).cards(cards()).order(board.getCardLists().size()).build();
        board.getCardLists().add(cardList);
        boardRepository.save(board);
        return cardList;
    }

    private List<Card> cards() {
        List<Card> cards = new ArrayList<>();
        cards.add(Card.builder().content("asd").build());
        cards.add(Card.builder().content("qwe").build());
        cards.add(Card.builder().content("zxc").build());
        return cards;
    }

    public void move(String boardId, int previousIndex, int currentIndex) {

    }
}
