import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/model/user';
import { ImageService } from 'src/service/image.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { load } from '@angular/core/src/render3';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  initial: string;
  imageUrl: SafeUrl;

  @Input() size: number;
  @Input() set user(user: User) {
    this.initial = user.username.charAt(0).toUpperCase();
    if (user.imageId) {
      this.loadUserImage(user.imageId);
    }
  }

  constructor(private imageService: ImageService,
              private sanitizer: DomSanitizer) {
  }

  loadUserImage(imageId: string) {
    this.imageService.get(imageId, this.size).pipe(
      map(image => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)
    ))).subscribe(safeUrl => this.imageUrl = safeUrl);
  }
}
