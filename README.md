# rozgar.today [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/yashanand1910/rozgar.today) ![GitHub repo size](https://img.shields.io/github/repo-size/yashanand1910/rozgar.today)

The rozgar.today web & mobile app built on Angular & Cordova.

## Environments

CI/CD setup using GitHub Actions & Firebase Hosting.

#### Alpha ([alpha.rozgar.today](https://alpha.rozgar.today)) ![Alpha](https://github.com/yashanand1910/rozgar.today/workflows/Alpha/badge.svg?branch=master) [![codecov](https://codecov.io/gh/yashanand1910/rozgar.today/branch/master/graph/badge.svg)](https://codecov.io/gh/yashanand1910/rozgar.today)

Master branch directly deployed on every push.

#### Beta ([beta.rozgar.today](https://beta.rozgar.today)) ![Beta](https://github.com/yashanand1910/rozgar.today/workflows/Beta/badge.svg?branch=beta) ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/yashanand1910/rozgar.today?include_prereleases) [![codecov](https://codecov.io/gh/yashanand1910/rozgar.today/branch/beta/graph/badge.svg)](https://codecov.io/gh/yashanand1910/rozgar.today)

Beta branch deployed on every merge from master and is followed by a beta release.

#### Stable ([rozgar.today](https://rozgar.today)) ![Stable](https://github.com/yashanand1910/rozgar.today/workflows/Stable/badge.svg?branch=stable) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/yashanand1910/rozgar.today) [![codecov](https://codecov.io/gh/yashanand1910/rozgar.today/branch/stable/graph/badge.svg)](https://codecov.io/gh/yashanand1910/rozgar.today)

Stable branch deployed on every merge from beta and is followed by a stable release.

## Contribute

If you wish to contribute, write to us at _development@rozgar.today_.

## Getting started

1. Go to project folder and install dependencies:

```sh
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```sh
npm start
```

## Project structure

```
www/                         web app production build
dist/                        mobile app production build
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global less variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.less                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- setup-jest.ts             unit tests entry point
platforms/                   Cordova platform-specific projects
plugins/                     Cordova plugins
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

## Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                                                    | Description                                                                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm start`                                             | Run development server on `http://localhost:4200/`                                                              |
| `npm run serve:sw`                                      | Run test server on `http://localhost:4200/` with service worker enabled                                         |
| `npm run build [-- --configuration=production]`         | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `www/` folder |
| `npm run cordova:prepare`                               | Prepare for building mobile app (restore Cordova platforms and plugins)                                         |
| `npm run cordova:run <ios/android> [--device]`          | Run app on target platform device or simulator                                                                  |
| `npm run cordova:build [-- --configuration=production]` | Build mobile app for production in `dist/` folder                                                               |
| `npm run cordova:clean`                                 | Removes `www/`, `platforms/` and `plugins/` folders                                                             |
| `npm test`                                              | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode                                        |
| `npm run test:ci`                                       | Lint code and run unit tests once for continuous integration                                                    |
| `npm run e2e`                                           | Run e2e tests using [Protractor](http://www.protractortest.org)                                                 |
| `npm run lint`                                          | Lint code                                                                                                       |
| `npm run translations:extract`                          | Extract strings from code and templates to `src/app/translations/template.json`                                 |
| `npm run docs`                                          | Display project documentation and coding guides                                                                 |
| `npm run compodoc`                                      | Generates and display generates documentation from code                                                         |
| `npm run prettier`                                      | Automatically format all `.ts`, `.js` & `.less` files                                                           |

When building the application, you can specify the target configuration using the additional flag
`--configuration <name>` (do not forget to prepend `--` to pass arguments to npm scripts).

The default build configuration is `prod`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

## Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

## Code formatting

All `.ts`, `.js` & `.less` files in this project are formatted automatically using [Prettier](https://prettier.io),
and enforced via the `test:ci` script.

A pre-commit git hook has been configured on this project to automatically format staged files, using
(pretty-quick)[https://github.com/azz/pretty-quick], so you don't have to care for it.

You can also force code formatting by running the command `npm run prettier`.
