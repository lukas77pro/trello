import { Component, Input } from '@angular/core';
import { User } from 'src/model/user';
import { ImageService } from 'src/service/image.service';
import { CacheService } from 'src/service/cache.service';

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
      const key = this.key(user.imageId);
      if (this.cacheService.images.has(key)) {
        this.imageUrl = this.cacheService.images.get(key);
      } else {
        this.loadUserImage(user.imageId);
      }
    }
  }

  constructor(private imageService: ImageService,
              private cacheService: CacheService) {
  }

  loadUserImage(imageId: string) {
    this.loading = true;
    this.imageService.get(imageId, this.size).subscribe(image => {
      this.imageUrl = `data:${image.contentType};base64,${image.data}`;
      this.cacheService.images.set(this.key(imageId), this.imageUrl);
      this.loading = false;
    });
  }

  key(imageId: string): string {
    return `${imageId}_${this.size}`;
  }
}
