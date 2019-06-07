import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  template: `
  <button class="button button-primary" (click)="subscribeToNotifications()">
    Subscribe
  </button>`,
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BOqo8P-LKyC-Jf6M1TD3QQhxUDMVFNydhrsJJORsnIYbgr9ESPMjGK2kFErWvswcLsC1hFSmutwg7N1AkG_jwNY";

  constructor(
    private authService: AuthService,
    private swPush: SwPush,
    /*private newsletterService: NewsletterService*/) {}

  ngOnInit(): void {
    this.authService.loadUser();
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    /*.then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())*/
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

}
