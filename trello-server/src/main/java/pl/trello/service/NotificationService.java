package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.Utils;
import pl.trello.model.Notification;
import pl.trello.model.NotificationList;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private NotificationList notificationList;
    private List<Notification> noti = new ArrayList<>();

    public Notification create(String title) throws NotFoundException {
        Notification notification = build(title);
        noti.add(notification);
        return notification;
    }

    private Notification build(String title) {
        return Notification.builder()
                .id(Utils.generateId())
                .title(title)
                .description("")
                .build();
    }

    public List<Notification> getAllNotifications() {
        return noti;
    }
}
