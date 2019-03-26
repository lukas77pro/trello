package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.CardList;
import pl.trello.service.CardListService;

@RestController
@RequestMapping("cardlist")
public class CardListRestController {

    private CardListService cardListService;

    public CardListRestController(CardListService cardListService) {
        this.cardListService = cardListService;
    }

    @PostMapping
    public CardList create(@RequestBody String name, @RequestParam String boardId) throws NotFoundException {
        return cardListService.create(name, boardId);
    }
}
