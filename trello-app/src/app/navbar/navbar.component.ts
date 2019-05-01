import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { ImageService } from 'src/service/image.service';
import {  map } from 'rxjs/operators';
import { User } from 'src/model/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  loadingImage = false;
  imageUrl: SafeUrl;

  constructor(private authService: AuthService,
              private imageService: ImageService,
              private sanitizer: DomSanitizer) {
  }

  getUserImageUrl(imageId: string) {
    if (imageId && !this.loadingImage) {
      this.imageService.get(imageId).pipe(
        map(image => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)
      ))).subscribe(safeUrl => this.imageUrl = safeUrl);
      this.loadingImage = true;
    }
  }

  getUser(): User {
    return this.authService.user;
  }

  logout(): void {
    this.imageUrl = null;
    this.authService.logout();
  }
}
