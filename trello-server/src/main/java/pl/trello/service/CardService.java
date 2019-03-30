package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.OrderedUtils;
import pl.trello.model.Card;
import pl.trello.model.CardList;

@Service
public class CardService {

    private CardListService cardListService;

    public CardService(CardListService cardListService) {
        this.cardListService = cardListService;
    }

    public Card create(String boardId, String cardListTitle, String title) throws NotFoundException {
        CardList cardList = cardListService.getByTitle(boardId, cardListTitle);
        Card card = Card.builder().title(title).description("").order(cardList.getCards().size()).build();
        cardList.getCards().add(card);
        cardListService.update(boardId, cardList);
        return card;
    }

    public void move(String boardId, String sourceCardListTitle, int previousIndex,
                     String targetCardListTitle, int currentIndex) throws NotFoundException {
        CardList source = cardListService.getByTitle(boardId, sourceCardListTitle);
        if (!sourceCardListTitle.equals(targetCardListTitle)) {
            CardList target = cardListService.getByTitle(boardId, targetCardListTitle);
            OrderedUtils.move(source.getCards(), previousIndex, target.getCards(), currentIndex);
            cardListService.update(boardId, target);
        } else {
            OrderedUtils.move(source.getCards(), previousIndex, currentIndex);
        }
        cardListService.update(boardId, source);
    }
}
