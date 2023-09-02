import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'english-assist';

  constructor(
    private readonly settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.setSettingsIfNotSet();
  }
}
