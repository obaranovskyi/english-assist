import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WordsComponent } from './words/words.component';
import { WordsService } from './shared/words.service';
import { CacheService } from './shared/cache.service';
import { CacheComponent } from './cache/cache.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [AppComponent, WordsComponent, CacheComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [WordsService, CacheService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
