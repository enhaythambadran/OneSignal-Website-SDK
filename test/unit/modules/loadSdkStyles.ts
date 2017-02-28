import "../../support/polyfills/polyfills";
import test from "ava";
import Database from "../../../src/services/Database";
import { TestEnvironment, HttpHttpsEnvironment } from "../../support/sdk/TestEnvironment";
import OneSignal from "../../../src/OneSignal";
import Random from "../../support/tester/Random";
import Environment from "../../../src/Environment";
import SubscriptionHelper from "../../../src/helpers/SubscriptionHelper";
import * as sinon from 'sinon';
import Bell from "../../../src/bell/Bell";
import InitHelper from "../../../src/helpers/InitHelper";
import MainHelper from "../../../src/helpers/MainHelper";

test.beforeEach(t => {
  t.context.ensureSdkStylesLoadedStub = sinon.stub(InitHelper, 'ensureSdkStylesLoaded');
});

test("should load if notify button is used", async t => {
  await TestEnvironment.initialize({
    initOptions: {
      notifyButton: {
        enable: true
      }
    },
    httpOrHttps: HttpHttpsEnvironment.Https
  });
  const notifyButton = new Bell({
    enable: true
  });
  try {
    await notifyButton.create();
  } catch (e) { }
  t.is(t.context.ensureSdkStylesLoadedStub.called, true);
});

test("should load if HTTP permission request is used", async t => {
  await TestEnvironment.initialize({
    initOptions: {
      httpPermissionRequest: {
        enable: true
      }
    },
    httpOrHttps: HttpHttpsEnvironment.Http
  });
  try {
    await MainHelper.showHttpPermissionRequestPostModal();
  } catch (e) { }
  t.is(t.context.ensureSdkStylesLoadedStub.called, true);
})