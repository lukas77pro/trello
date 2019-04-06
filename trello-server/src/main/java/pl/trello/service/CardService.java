package pl.trello.service;


import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.OrderedUtils;
import pl.trello.model.Card;
import pl.trello.model.CardList;
import org.springframework.beans.factory.annotation.Autowired;
import pl.trello.model.Board;
import pl.trello.model.Checklist;
import pl.trello.repository.BoardRepository;
import pl.trello.repository.CardRepository;
import java.util.List;


@Service
public class CardService {

    @Autowired
    private CardListService cardListService;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private BoardRepository boardRepository;

    public Card create(String boardId, String cardListTitle, String title) throws NotFoundException {
        Board board = boardRepository.findById(boardId).get();
        Card card = null;
        for (CardList cardList : board.getCardLists()) {
            if(cardList.getTitle().equals(cardListTitle)) {
                card = Card.builder().title(title).description("").order(cardList.getCards().size()).build();
                cardList.getCards().add(card);

                cardRepository.save(card);
                cardListService.update(boardId, cardList);
            }
        }
        boardRepository.save(board);

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

    public void delete(String id) {
        cardRepository.deleteById(id);
    }

    public Card update(String id, Card card) {
        if (cardRepository.existsById(id)){
            cardRepository.save(card);
        } else {
            new NotFoundException("Card with ID '" + id + "' not found");
        }
        return card;
    }

    public Card get(String id) throws NotFoundException {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Card with ID '" + id + "' not found"));
        return card;
    }

    public List<Card> getAll() {
        return cardRepository.findAll();
    }
}
