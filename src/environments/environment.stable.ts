// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
// noinspection ES6PreferShortImport
import { env } from './.env';

export const environment = {
  production: true,
  hmr: false,
  version: env.npm_package_version,
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  firebase: {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: 'rozgar-today.firebaseapp.com',
    databaseURL: 'https://rozgar-today.firebaseio.com',
    projectId: 'rozgar-today',
    storageBucket: 'rozgar-today.appspot.com',
    messagingSenderId: '712869014206',
    appId: '1:712869014206:web:ead6947c791e747d450cef',
    measurementId: 'G-TGL57ZX37X',
  },
};