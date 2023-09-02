import { Component } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  checked: boolean = this.settingsService.getApplyFirstLoad();

  constructor(
    private readonly settingsService: SettingsService
  ) {}

  onSettingsUpdate(checked: boolean): void {
    this.settingsService.setApplyFirstLoad(checked);
  }
}
