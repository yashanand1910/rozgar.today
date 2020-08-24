import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from '@app/shell/shell.module';
import { AuthModule } from '@app/auth';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),

    CoreModule,
    AuthModule,
    ShellModule,

    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [Keyboard, StatusBar, SplashScreen],
  bootstrap: [AppComponent],
})
export class AppModule {}
