package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Notification;
import pl.trello.service.NotificationService;

@RestController
@RequestMapping("notification")
public class NotificationRestController {

    private NotificationService notificationService;

    public NotificationRestController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification create(@RequestBody String title) throws NotFoundException {
        return notificationService.create(title);
    }
}
