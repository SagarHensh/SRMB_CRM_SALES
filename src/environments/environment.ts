// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 
  //API_ROOT: 'http://34.222.100.29:8290/api/',
 // API_ROOT: 'http://192.168.43.128:8290/api/',

//  .................Local.................
  API_ROOT: 'http://3.7.173.54:8290/api/',
  UPLOAD_IMAGE_BASE_PATH : 'http://3.7.173.54:8290',
  DASHBOARD_API_ROOT: 'http://3.7.173.54:6065/',
  SFA_API_ROOT: 'http://3.7.173.54:8281/api/',
  SECRECT: 'lingo@payload@node@response',
  LOCAL_SECRECT: 'lingo@payload@react@request',
  production: false,


  // ......................Production.................

  // API_ROOT: 'https://api.chalobecho.com/api/', 
  // UPLOAD_IMAGE_BASE_PATH : 'https://api.chalobecho.com',
  // DASHBOARD_API_ROOT: 'https://api3.chalobecho.com/',
  // SFA_API_ROOT: 'https://api2.chalobecho.com/api/',

  // SECRECT: 'lingo@payload@node@response',
  // LOCAL_SECRECT: 'lingo@payload@react@request',
  // production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
