// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.stable.ts`.
// The list of file replacements can be found in `angular.json`.

// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: false,
  hmr: false,
  version: `${env.npm_package_version} (Alpha)`,
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  firebase: {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: 'rozgar-today.firebaseapp.com',
    databaseURL: 'https://rozgar-today.firebaseio.com',
    projectId: 'rozgar-today',
    storageBucket: 'rozgar-today.appspot.com',
    messagingSenderId: '712869014206',
    appId: '1:712869014206:web:a3d90a66889972ec450cef',
    measurementId: 'G-GE3VRTFLN6'
  },
  stripePublishableKey:
    'pk_test_51Hb1I6Hspk8hbSIzfU1dsnkBhLVz0h6OBmXg2j9UE310O016q4sruj0mMyqFVHEH1y3djZos0PuB9tg9xpS3Wew500IggP6rEn'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
