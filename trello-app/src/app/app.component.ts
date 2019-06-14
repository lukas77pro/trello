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
      if(notifiList[i].authorid != this.authService.user.id)
      {
          this.createSpecificNotification(notifiList[i], this.authService.user.username);
      }
    }
  }

  createSpecificNotification(notifi: AppNotification, authorName: string){
    switch(notifi.type){
      case "NewCard": 
        this.displayNotification(notifi, authorName, "create new card!");
        break;
      case "NewBoard":
        this.displayNotification(notifi, authorName, "create new board!");
        break;
      case "NewInvitation":
        this.displayNotification(notifi, authorName, "send you an invitation to team");
        break;
      case "NewComment":
        this.displayNotification(notifi, authorName, "add new comment to card");
        break;
    }
  }

  displayNotification(notifi: AppNotification, authorName: string, message: string) {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: "User: "+authorName+" "+message,
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
