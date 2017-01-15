import '../../support/polyfills/polyfills';
import test from 'ava';
import OneSignal from "../../../src/OneSignal";
import {InvalidArgumentError, InvalidArgumentReason} from "../../../src/errors/InvalidArgumentError";
import LimitStore from "../../../src/LimitStore";
import Database from "../../../src/Database";
import OneSignalError from "../../../src/errors/OneSignalError";
import {throws} from "../../support/tester/asyncFunctions";
import Macros from '../../support/tester/Macros';
import {TestEnvironment} from "../../support/sdk/TestEnvironment";
import Environment from "../../../src/Environment";


test("url cannot be null",
     Macros.expectInvalidArgumentError,
     OneSignal.setDefaultNotificationUrl,
     null
);

test("url cannot be empty string",
     Macros.expectInvalidArgumentError,
     OneSignal.setDefaultNotificationUrl,
     '');

test("url cannot be missing protocol",
     Macros.expectInvalidArgumentError,
     OneSignal.setDefaultNotificationUrl,
     'test.com');

test("valid url can be set and retrieved", async t => {
  TestEnvironment.initialize();
  await OneSignal.setDefaultNotificationUrl("https://test.com");
  const appState = await Database.getAppState();
  t.is(appState.defaultNotificationUrl, 'https://test.com');
});