import { Component } from '@angular/core';

import { CacheService } from '../shared/cache.service';

@Component({
  selector: 'ea-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss'],
})
export class CacheComponent {
  constructor(public readonly cacheService: CacheService) {}

  mergeAll() {
    this.cacheService.mergeAll();
  }
}
