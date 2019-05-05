import { Component, Input } from '@angular/core';
import { User } from 'src/model/user';
import { ImageService } from 'src/service/image.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  initial: string;
  imageUrl: string;
  loading = false;

  @Input() size: number;
  @Input() set user(user: User) {
    this.initial = user.username.charAt(0).toUpperCase();
    if (user.imageId) {
      this.loadUserImage(user.imageId);
    }
  }

  constructor(private imageService: ImageService) {
  }

  loadUserImage(imageId: string) {
    this.loading = true;
    this.imageService.get(imageId, this.size).subscribe(image => {
      this.imageUrl = `data:${image.contentType};base64,${image.data}`;
      this.loading = false;
    });
  }
}
