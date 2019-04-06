package pl.trello.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.OrderedUtils;
import pl.trello.model.Board;
import pl.trello.model.CardList;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardListService {

    @Autowired
    private BoardService boardService;

    public CardList create(String boardId, String title) throws NotFoundException {
        Board board = boardService.getById(boardId);
        CardList cardList = CardList.builder().title(title).cards(new ArrayList<>()).order(board.getCardLists().size()).build();
        board.getCardLists().add(cardList);
        boardService.update(boardId, board);
        return cardList;
    }

    public CardList getByTitle(String boardId, String title) throws NotFoundException {
        return boardService.getById(boardId).getCardLists().stream()
                .filter(cardList -> cardList.getTitle().equalsIgnoreCase(title)).findAny()
                .orElseThrow(() -> new NotFoundException("Cardlist '" + title + "' not found"));
    }

    public CardList update(String boardId, CardList cardListUpdate) throws NotFoundException {
        getByTitle(boardId, cardListUpdate.getTitle());
        Board board = boardService.getById(boardId);
        board.setCardLists(updateCardList(board.getCardLists(), cardListUpdate));
        boardService.update(boardId, board);
        return cardListUpdate;
    }

    public void move(String boardId, int previousIndex, int currentIndex) throws NotFoundException {
        Board board = boardService.getById(boardId);
        board.setCardLists(OrderedUtils.move(board.getCardLists(), previousIndex, currentIndex));
        boardService.update(boardId, board);
    }

    private List<CardList> updateCardList(List<CardList> cardLists, CardList cardListUpdate) {
        return cardLists.stream()
                .map(cardList -> cardList.getTitle().equals(cardListUpdate.getTitle()) ? cardListUpdate : cardList)
                .collect(Collectors.toList());
    }
}
