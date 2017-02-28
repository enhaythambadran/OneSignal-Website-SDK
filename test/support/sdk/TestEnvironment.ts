
import Environment from "../../../src/Environment";
import OneSignal from "../../../src/OneSignal";
import Random from "../tester/Random";
import Database from "../../../src/services/Database";
import { NotificationPermission } from "../../../src/models/NotificationPermission";
import { Test } from "ava";
import * as jsdom from 'jsdom';


var global = new Function('return this')();

export enum HttpHttpsEnvironment {
  Http,
  Https
}

export interface TestEnvironmentConfig {
  environment?: string,
  initOptions?: any,
  httpOrHttps?: HttpHttpsEnvironment,
  permission?: NotificationPermission
}

export class TestEnvironment {
  static async stubEnvironment(config: TestEnvironmentConfig) {
    if (config.httpOrHttps == HttpHttpsEnvironment.Http) {
      var url = 'http://localhost:3000/webpush/sandbox?http=1';
    } else {
      var url = 'https://localhost:3001/webpush/sandbox?https=1';
    }
    global.window = await new Promise((resolve, reject) => {
      jsdom.env({
        html: '<!doctype html><html><head></head><body></body></html>',
        url: url,
        done: (err, window) => {
          if (err) {
            console.log(err);
            reject('Failed to create a JsDom mock browser environment:' + err);
          } else {
            resolve(window);
          }
        }
      });
    });
    jsdom.reconfigureWindow(global.window, { top: global.window });
    global.document = global.window.document;
    global.navigator = global.window.navigator;
    global.location = global.window.location;
    global.XMLHttpRequest = global.window.XMLHttpRequest;
  }

  static stubNotification(config: TestEnvironmentConfig) {
    global.Notification = {
      permission: config.permission ? config.permission: NotificationPermission.Default,
      maxActions: 2,
      requestPermission: function() { }
    };
  }

  static async initialize(config: TestEnvironmentConfig = {}) {
    Database.databaseInstanceName = Random.getRandomString(10);
    global.OneSignal = OneSignal;
    global.OneSignal.config = config.initOptions ? config.initOptions : {};
    global.OneSignal.initialized = true;
    await TestEnvironment.stubEnvironment(config);
    TestEnvironment.stubNotification(config);
    if (config.environment) {
      Environment.getEnv = () => config.environment;
    }
    return global.OneSignal;
  }
}