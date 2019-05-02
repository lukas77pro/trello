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

  constructor(private authService: AuthService,
              private imageService: ImageService) {
  }

  getUser(): User {
    return this.authService.user;
  }

  logout(): void {
    this.authService.logout();
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.imageService.upload(file).subscribe(imageId => this.authService.updateUserImage(imageId));
  }
}
