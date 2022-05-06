// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

var enabledSuites: Map<String, boolean> = new Map();
enabledSuites.set('ArtItemService', true);
enabledSuites.set('ContestantService', true);
var enabled = false;
jasmine.getEnv().addReporter({
  suiteStarted(result) {
    enabled = enabledSuites.has(result.fullName);
  },
  specStarted(result) {
    if (!enabled) return;
    console.log(`#####   START  ${result.fullName}:`);
  },
  specDone(result) {
    if (!enabled) return;
    let stat = result.status;
    if (stat == 'excluded') console.log('##### EXCLUDED');
    else {
      // console.log({ pre: listPreSpec, post: listPostSpec });
      console.log(result.properties);
      console.log(
        `#####   ${stat.toUpperCase()} ${result.fullName}: DUR:${
          result.duration
        } ${result.pendingReason!}`
      );
    }
  },
});

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
