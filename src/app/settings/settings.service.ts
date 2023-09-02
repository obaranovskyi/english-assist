import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsService {

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
