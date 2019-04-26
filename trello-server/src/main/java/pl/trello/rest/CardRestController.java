package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Card;
import pl.trello.service.CardService;

@RestController
@RequestMapping("boards/{boardId}/cardlists/{cardListId}/cards")
public class CardRestController {

    private CardService cardService;

    public CardRestController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public Card create(@PathVariable String boardId, @PathVariable String cardListId, @RequestBody String title) throws NotFoundException {
        return cardService.create(boardId, cardListId, title);
    }

    @PutMapping("{cardId}")
    public Card create(@PathVariable String boardId, @PathVariable String cardListId, @PathVariable String cardId,
                       @RequestBody Card card) throws NotFoundException {
        return cardService.update(boardId, cardListId, cardId, card);
    }

    @PutMapping("move")
    public void move(@PathVariable String boardId, @PathVariable String cardListId, @RequestParam int previousIndex,
                     @RequestParam String targetCardListId, @RequestParam int currentIndex) throws NotFoundException {
        cardService.move(boardId, cardListId, previousIndex, targetCardListId, currentIndex);
    }
}
