import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { ImageService } from 'src/service/image.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {
  }

  getUser(): User {
    return this.authService.user;
  }
}
