package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.CardList;
import pl.trello.service.CardListService;

@RestController
@RequestMapping("boards/{boardId}/cardlists")
public class CardListRestController {

    private CardListService cardListService;

    public CardListRestController(CardListService cardListService) {
        this.cardListService = cardListService;
    }

    @PostMapping
    public CardList create(@PathVariable String boardId, @RequestBody String name) throws NotFoundException {
        return cardListService.create(boardId, name);
    }

    @PutMapping("move")
    public void move(@PathVariable String boardId, @RequestParam int previousIndex, @RequestParam int currentIndex) throws NotFoundException {
        System.out.println(previousIndex + " " + currentIndex);
        cardListService.move(boardId, previousIndex, currentIndex);
    }
}
