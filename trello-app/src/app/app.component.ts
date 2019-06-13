import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { NotificationService } from 'src/service/notification.service';
import { AppNotification } from 'src/model/app-notification';
import { UserService } from 'src/service/user.service';
import { BoardService } from 'src/service/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private notificationService: NotificationService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.loadUser();

    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);});

    if (Notification.permission == 'granted') {
      this.showAllNotification(this.authService.user.id);
      console.log(Date.now);
    }
  }

  showAllNotification(userId: string){
    console.log("!!!!!!!!!!"+userId);
    var notificationList = this.notificationService.getAll(userId);
    notificationList.subscribe(notificationList => {
      console.log(notificationList[0]);
      this.filterNotification(notificationList);
    });
  }

  filterNotification(notifiList: AppNotification[]){
    var len = notifiList.length;
    var name : string;
    for(var i = 0; i < len; i++){
      console.log("Login from authServis "+this.authService.user.id);
      console.log("notification Author "+notifiList[i].authorid);
      
      if(notifiList[i].authorid != this.authService.user.id)
      {
        console.log("after match different user !=");
          
          console.log("User name: "+this.authService.user.username);
          console.log("Object Noti "+notifiList[i].type);
          this.displayNotification(notifiList[i], this.authService.user.username);
      }
    }
  }

  displayNotification(notifi: AppNotification, authorName: string){
    if(notifi.type == "NewCard"){
      this.displayNotificationNewCard(notifi, authorName);
    }
  }

  displayNotificationNewCard(notifi: AppNotification, authorName: string) {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: "User: "+authorName+" create new card!",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification('Notification from server!', options);
    });
  }
}
