import { NgModule } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { CoreModule } from '@core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from '@app/shell/shell.module';
import { AuthModule } from '@auth';
import { JoinModule } from '@app/join';
import { ReactiveComponentModule } from '@ngrx/component';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    CoreModule,
    ShellModule,
    JoinModule,
    AuthModule,
    AppRoutingModule,
    ReactiveComponentModule,
    CommonModule,
    NzSpinModule
  ],
  declarations: [AppComponent],
  providers: [Keyboard, StatusBar, SplashScreen],
  bootstrap: [AppComponent]
})
export class AppModule {}
