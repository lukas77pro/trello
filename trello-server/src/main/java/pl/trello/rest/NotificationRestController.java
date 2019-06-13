package pl.trello.rest;
import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.AppNotification;
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
    public List<AppNotification> getAll(@RequestParam String userId) {
        return notificationService.getAllNotifications(userId);
    }

    @PostMapping
    public AppNotification create(@RequestBody AppNotification notification) throws NotFoundException {
        return notificationService.create(notification);
    }
}
