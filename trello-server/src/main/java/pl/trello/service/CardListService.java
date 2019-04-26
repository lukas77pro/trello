package pl.trello.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.OrderedUtils;
import pl.trello.core.Utils;
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
        CardList cardList = build(title, board);
        board.getCardLists().add(cardList);
        boardService.update(boardId, board);
        return cardList;
    }

    public CardList getById(String boardId, String cardListId) throws NotFoundException {
        return boardService.getById(boardId).getCardLists().stream()
                .filter(cardList -> cardList.getId().equals(cardListId)).findAny()
                .orElseThrow(() -> new NotFoundException("Cardlist not found"));
    }

    public CardList update(String boardId, CardList cardListUpdate) throws NotFoundException {
        getById(boardId, cardListUpdate.getId());
        Board board = boardService.getById(boardId);
        board.setCardLists(updateCardLists(board.getCardLists(), cardListUpdate));
        boardService.update(boardId, board);
        return cardListUpdate;
    }

    public void move(String boardId, int previousIndex, int currentIndex) throws NotFoundException {
        Board board = boardService.getById(boardId);
        board.setCardLists(OrderedUtils.move(board.getCardLists(), previousIndex, currentIndex));
        boardService.update(boardId, board);
    }

    private List<CardList> updateCardLists(List<CardList> cardLists, CardList cardListUpdate) {
        return cardLists.stream()
                .map(cardList -> cardList.getId().equals(cardListUpdate.getId()) ? cardListUpdate : cardList)
                .collect(Collectors.toList());
    }

    private CardList build(String title, Board board) {
        return CardList.builder()
                .id(Utils.generateId())
                .title(title)
                .cards(new ArrayList<>())
                .order(board.getCardLists().size())
                .build();
    }
}
