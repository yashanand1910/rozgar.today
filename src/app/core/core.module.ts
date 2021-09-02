import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { environment } from '@env/environment';
import { RouteReusableStrategy } from '@core/utils';
import { ErrorHandlerInterceptor } from '@core/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { metaReducers, reducers } from './reducers/core.reducer';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AlertEffects, CollectionEffects, ConstraintEffects, CoreEffects } from '@core/effects';
import { ngZorroConfig } from '@core/nz-global.config';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeEffects } from './effects/stripe.effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    NzMessageModule,
    TranslateModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.firebase.emulator.active) {
        connectFirestoreEmulator(
          firestore,
          environment.firebase.emulator.firestoreURL.host,
          environment.firebase.emulator.firestoreURL.port
        );
      }
      return firestore;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.firebase.emulator.active) {
        connectFunctionsEmulator(
          functions,
          environment.firebase.emulator.functionsURL.host,
          environment.firebase.emulator.functionsURL.port
        );
      }
      return functions;
    }),
    provideRemoteConfig(() => getRemoteConfig()),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    EffectsModule.forRoot([CoreEffects, ConstraintEffects, AlertEffects, CollectionEffects, StripeEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    NgxStripeModule.forRoot(environment.stripe.publishableKey)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    {
      provide: NZ_CONFIG,
      useValue: ngZorroConfig
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
