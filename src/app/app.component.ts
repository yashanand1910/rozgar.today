import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { environment } from '@env/environment';
import { Logger } from '@core/services';
import { I18nService } from '@i18n/services';
import { untilDestroyed } from '@core/utils';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { CoreActions } from '@core/actions';
import { Store } from '@ngrx/store';
import { CoreSelectors } from '@core/selectors';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  error$: Observable<FirebaseError>;
  isLoading$: Observable<boolean>;

  // For the nz library
  private nzI18nLanguageMap = {
    'en-US': en_US
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private zone: NgZone,
    private keyboard: Keyboard,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private i18nService: I18nService,
    private nzI18n: NzI18nService,
    private store: Store
  ) {}

  async ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('App Init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    this.nzI18n.setLocale(this.nzI18nLanguageMap[environment.defaultLanguage]);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(
            `${this.translateService.instant(title)} – ${this.translateService.instant('APP_NAME')}`
          );
        }
      });

    // Cordova platform and plugins initialization
    document.addEventListener(
      'deviceready',
      () => {
        this.zone.run(() => this.onCordovaReady());
      },
      false
    );

    // Initialize core
    this.store.dispatch(CoreActions.initialize());

    // Restrict everything if core stuff load fails
    this.error$ = this.store.select(CoreSelectors.selectError);
    // Show loading until user is loaded onto store
    this.isLoading$ = this.store.select(CoreSelectors.selectIsLoading);
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  private onCordovaReady() {
    log.debug('Device ready');

    if ((window as any).cordova) {
      log.debug('Cordova init');

      this.keyboard.hideFormAccessoryBar(true);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
  }
}
