import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from '../../cache.service';
import { NOTIFICATION_CONFIG } from '../../constants';

@Component({
  selector: 'ea-add-cache',
  templateUrl: './add-cache.component.html',
  styleUrls: ['./add-cache.component.scss'],
})
export class AddCacheComponent {
  panelOpenState = false;
  cacheName: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    public readonly cacheService: CacheService
  ) {}

  addCache() {
    this.cacheService.addCurrentToCache(this.cacheName);
    this.panelOpenState = false;

    this._snackBar.open(
      `You've added new cache with the name ${this.cacheName}.`,
      'OK',
      NOTIFICATION_CONFIG
    );

    this.cacheName = '';
  }
}
