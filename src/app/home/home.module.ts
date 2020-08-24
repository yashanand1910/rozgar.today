import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, Angulartics2Module, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
