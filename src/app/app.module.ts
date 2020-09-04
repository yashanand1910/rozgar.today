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

@NgModule({
  imports: [CoreModule, ShellModule, JoinModule, AuthModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [Keyboard, StatusBar, SplashScreen],
  bootstrap: [AppComponent],
})
export class AppModule {}
