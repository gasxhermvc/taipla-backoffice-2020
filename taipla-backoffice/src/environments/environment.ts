// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    baseUrl: 'https://localhost:5001/api',
    version: 'v1'
  },
  auth: {
    redirects: {
      intent: '/backoffice',
      login: '/login',
      logout: '/logout'
    }
  },
  localStorage: {
    root: 'taipla'
  },
  copyright: {
    text: '© 2020 TAIPLA.com All Rights Reserved | Design by Dev.awesome.th',
    author: 'Dev.awesome.th'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
