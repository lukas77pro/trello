package pl.trello.service;

import org.springframework.stereotype.Service;
import pl.trello.core.NotFoundException;
import pl.trello.core.Utils;
import pl.trello.model.AppNotification;
import pl.trello.model.UpdateData;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NotificationService {


    private List<AppNotification> noti = new ArrayList<>();
    private List<UpdateData> updateData = new ArrayList<>();

    public AppNotification create(AppNotification notification) throws NotFoundException {
        AppNotification newNotification = build(notification);
        noti.add(newNotification);
        return newNotification;
    }

    private AppNotification build(AppNotification notification) {
        return AppNotification.builder()
                .id(Utils.generateId())
                .authorid(notification.getAuthorid())
                .type(notification.getType())
                .description(notification.getDescription())
                .date(new Date(System.currentTimeMillis()))
                .build();
    }

    public List<AppNotification> getAllNotifications(String userid)
    {

        UpdateData data = getTimeForUser(userid);
        List<AppNotification> returnNoti = new ArrayList<>();

        for(int i = 0; i < noti.size(); i++){
            System.out.println("FORRRRRR");
            System.out.println("NOTIFICATION TIME"+noti.get(i).getDate().getTime());
            System.out.println("USER LAST TIME"+data.getLastUpdate().getTime());
            if(noti.get(i).getDate().getTime() >= data.getLastUpdate().getTime()){
                System.out.println("IF");
                returnNoti.add(noti.get(i));
            }
        }
        updateTimeForUser(data.getUserId());
        return returnNoti;
    }

    private UpdateData getTimeForUser(String userid) {
        UpdateData newuser = new UpdateData();

        for (int i = 0; i < updateData.size(); i++) {
            if (userid.equals(updateData.get(i).getUserId())) {
                System.out.println("git");
                return updateData.get(i);
            }
        }
        Date date = new Date(System.currentTimeMillis());
        newuser.setUserId(userid);
        newuser.setLastUpdate(date);
        updateData.add(newuser);
        return newuser;
    }

    private void updateTimeForUser(String userid) {
        for (int i = 0; i < updateData.size(); i++) {
            if (userid == updateData.get(i).getUserId()) {
                Date date = new Date(System.currentTimeMillis());
                updateData.get(i).setLastUpdate(date);
            }
        }
    }

}
