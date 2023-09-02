import { Injectable } from '@angular/core';

import { CacheService } from '../shared/cache.service';
import { WordsService } from '../shared/words.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  constructor(
    cacheService: CacheService,
    wordService: WordsService
  ) {
    if (this.getApplyFirstLoad()) {
      const cache = cacheService.cacheBhvSubj.getValue();
      wordService.setWords(JSON.parse(<any>cache[0].value));
    }
  }

  setSettingsIfNotSet(): void {
    const settings = localStorage.getItem('settings');
    if(!settings) {
      localStorage.setItem('settings', JSON.stringify({
        applyFirstOnLoad: true
      }));
    }
  }

  setApplyFirstLoad(isApplyFirstLoad: boolean): void {
    localStorage.setItem('settings', JSON.stringify({
      applyFirstOnLoad: isApplyFirstLoad
    }));
  }

  getApplyFirstLoad(): boolean {
    return JSON.parse(
      (localStorage.getItem('settings') as any)
    )?.applyFirstOnLoad || false;
  }
}
