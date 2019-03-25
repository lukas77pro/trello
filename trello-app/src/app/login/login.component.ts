import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { AuthService } from 'src/service/auth.service';
import { Route } from '@angular/compiler/src/core';
import { EventService } from 'src/event/event.service';
import { EventType, Events, UserLoggedIn } from 'src/event/events';
import { Subscriber } from 'src/event/subscriber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, Subscriber {
  loginForm = new FormGroup({
    username: new FormControl('', [this.required]),
    password: new FormControl('', [this.required, Validators.minLength(5)])
  });

  constructor(private authService: AuthService,
              private eventService: EventService,
              private router: Router) {
    this.eventService.subscribe(this, EventType.UserLoggedIn);
  }

  ngOnInit(): void {
  }

  onEventReceived(event: Events): void {
    if (event instanceof UserLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password);
    }
  }

  private required(control: AbstractControl) {
    return control.value.trim() ? null : { 'required': true };
  }
}
