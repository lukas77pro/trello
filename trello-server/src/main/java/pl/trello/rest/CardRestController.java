package pl.trello.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Card;
import pl.trello.service.CardService;
import java.util.List;

@RestController
@RequestMapping("boards/{boardId}/cardlists/{cardListTitle}/cards")
public class CardRestController {

    @Autowired
    private CardService cardService;

    @PostMapping
    public Card create(@PathVariable String boardId, @PathVariable String cardListTitle, @RequestBody String title) throws NotFoundException {
        return cardService.create(boardId, cardListTitle, title);
    }

    @PutMapping("move")
    public void move(@PathVariable String boardId, @PathVariable String cardListTitle, @RequestParam int previousIndex,
                     @RequestParam String targetCardListTitle, @RequestParam int currentIndex) throws NotFoundException {
        cardService.move(boardId, cardListTitle, previousIndex, targetCardListTitle, currentIndex);
    }

    @GetMapping
    public List<Card> getAll() {
        return cardService.getAll();
    }

    @GetMapping("/{id}")
    public Card getById(@PathVariable String id) throws NotFoundException {
        return cardService.get(id);
    }


    @PutMapping("/{id}")
    public Card update(@PathVariable String id, @RequestBody Card card) throws NotFoundException {
        return cardService.update(id, card);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {

        cardService.delete(id);
    }
}
