package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.trello.core.Ordered;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationList implements Serializable{

    //private static final long serialVersionUID = 6726852648003272766L;

    private String id;

    private List<Notification> notifications;

    public List<Notification> getList(){
        return notifications;
    }
}
