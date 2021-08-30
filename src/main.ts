/*
 * Entry point of the application.
 * Only platform bootstrapping code should be here.
 * For app-specific initialization, use `app/app.component.ts`.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';
import { hmrBootstrap } from './hmr';
import { FIREBASE_OPTIONS } from '@angular/fire';
import firebase from 'firebase';

if (environment.production) {
  enableProdMode();
} else {
  // TODO Workaround for clearing the console whenever hot update occurs
  window.addEventListener('message', function onWebpackMessage(e) {
    if (e.data?.type == 'webpackInvalid') {
      console.clear();
    }
  });
}

const bootstrap = () =>
  platformBrowserDynamic([{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }]).bootstrapModule(AppModule);

// TODO Workaround for Auth emulator to work properly on refresh (https://github.com/angular/angularfire/issues/2656#issuecomment-813030620)
firebase.initializeApp(environment.firebase);

if (environment.firebase.useEmulators) {
  firebase.auth().useEmulator(environment.firebase.emulator.authURL);
}

if (environment.hmr) {
  hmrBootstrap(module, bootstrap);
} else {
  bootstrap().catch((err) => console.error(err));
}
