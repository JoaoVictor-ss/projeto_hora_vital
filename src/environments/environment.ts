// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// environment.ts (Desenvolvimento)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // Você troca isso se precisar
  firebase: {
   apiKey: "AIzaSyCD3w3id7EQhwun7fbXtsoWDggeAISkcqw",
  authDomain: "projeto-29907.firebaseapp.com",
  projectId: "projeto-29907",
  storageBucket: "projeto-29907.firebasestorage.app",
  messagingSenderId: "759920664497",
  appId: "1:759920664497:web:51cd548c1504a67c0e2790",
  measurementId: "G-BJ631CJNB6"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
