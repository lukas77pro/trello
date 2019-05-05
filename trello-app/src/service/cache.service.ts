import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  images = new Map<string, string>();

  constructor() {
  }

  removeAll(prefix: string) {
    if (prefix) {
      Array.from(this.images.keys())
        .filter(key => key.startsWith(prefix))
        .forEach(key => this.images.delete(key));
    }
  }
}
