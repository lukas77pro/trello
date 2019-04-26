package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.OrderedUtils;
import pl.trello.core.Utils;
import pl.trello.model.Card;
import pl.trello.model.CardList;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {

    private CardListService cardListService;

    public CardService(CardListService cardListService) {
        this.cardListService = cardListService;
    }

    public Card getById(String boardId, String cardListId, String cardId) throws NotFoundException {
        return cardListService.getById(boardId, cardListId).getCards().stream()
                .filter(card -> card.getId().equals(cardId)).findAny()
                .orElseThrow(() -> new NotFoundException("Card not found"));
    }

    public Card create(String boardId, String cardListId, String title) throws NotFoundException {
        CardList cardList = cardListService.getById(boardId, cardListId);
        Card card = build(title, cardList);
        cardList.getCards().add(card);
        cardListService.update(boardId, cardList);
        return card;
    }

    public void move(String boardId, String sourceCardListId, int previousIndex,
                     String targetCardListId, int currentIndex) throws NotFoundException {
        CardList source = cardListService.getById(boardId, sourceCardListId);
        if (!sourceCardListId.equals(targetCardListId)) {
            CardList target = cardListService.getById(boardId, targetCardListId);
            OrderedUtils.move(source.getCards(), previousIndex, target.getCards(), currentIndex);
            cardListService.update(boardId, target);
        } else {
            OrderedUtils.move(source.getCards(), previousIndex, currentIndex);
        }
        cardListService.update(boardId, source);
    }

    public Card update(String boardId, String cardListId, String cardId, Card cardUpdate) throws NotFoundException {
        getById(boardId, cardListId, cardId);
        CardList cardList = cardListService.getById(boardId, cardListId);
        cardList.setCards(updateCards(cardList.getCards(), cardUpdate));
        cardListService.update(boardId, cardList);
        return cardUpdate;
    }

    private List<Card> updateCards(List<Card> cards, Card cardUpdate) {
        return cards.stream()
                .map(card -> card.getId().equals(cardUpdate.getId()) ? cardUpdate : card)
                .collect(Collectors.toList());
    }

    private Card build(String title, CardList cardList) {
        return Card.builder()
                .id(Utils.generateId())
                .title(title)
                .description("")
                .order(cardList.getCards().size())
                .checklists(new ArrayList<>())
                .comments(new ArrayList<>())
                .build();
    }
}
