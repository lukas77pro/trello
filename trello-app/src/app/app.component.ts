import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { NotificationService } from 'src/service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.authService.loadUser();

    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);});

      this.showAllNotification();

  }

  showAllNotification(){
    var notificationList = this.notificationService.getAll();
    notificationList.subscribe(notificationList => {
        var len = notificationList.length;
        for(var i = 0; i < len; i++){
          this.displayNotification(notificationList[i], i);
        }
    });
  }

  displayNotification(notifi: Notification, it: Number) {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: notifi.title+it.toString(),
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        console.log(reg);
        reg.showNotification('Notification from server!', options);
      });
    }
  }


}
