package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Board;
import pl.trello.model.Notification;
import pl.trello.model.User;
import pl.trello.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("notification")
public class NotificationRestController {

    private NotificationService notificationService;

    public NotificationRestController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAllNotifications();
    }

    @PostMapping
    public Notification create(@RequestBody String title) throws NotFoundException {
        return notificationService.create(title);
    }
}
