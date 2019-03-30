package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Card;
import pl.trello.service.CardService;

@RestController
@RequestMapping("boards/{boardId}/cardlists/{cardListTitle}/cards")
public class CardRestController {

    private CardService cardService;

    public CardRestController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public Card create(@PathVariable String boardId, @PathVariable String cardListTitle, @RequestBody String title) throws NotFoundException {
        return cardService.create(boardId, cardListTitle, title);
    }

    @PutMapping("move")
    public void move(@PathVariable String boardId, @PathVariable String cardListTitle, @RequestParam int previousIndex,
                     @RequestParam String targetCardListTitle, @RequestParam int currentIndex) throws NotFoundException {
        cardService.move(boardId, cardListTitle, previousIndex, targetCardListTitle, currentIndex);
    }
}
