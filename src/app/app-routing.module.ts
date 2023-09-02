import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CacheComponent } from './cache/cache.component';
import { SettingsComponent } from './settings/settings.component';
import { TestComponent } from './test/test.component';
import { WordsComponent } from './words/words.component';

const routes: Routes = [
  { path: '', redirectTo: '/words', pathMatch: 'full' },
  { path: 'words', component: WordsComponent },
  { path: 'test', component: TestComponent },
  { path: 'cache', component: CacheComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
