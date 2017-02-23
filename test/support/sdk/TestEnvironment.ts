
import Environment from "../../../src/Environment";
import OneSignal from "../../../src/OneSignal";
import Random from "../tester/Random";
import Database from "../../../src/services/Database";


var global = new Function('return this')();

export interface TestEnvironmentConfig {
  environment?: string,
}

export class TestEnvironment {
  static initialize(config: TestEnvironmentConfig = {}) {
    Database.databaseInstanceName = Random.getRandomString(10);
    global.OneSignal = OneSignal;
    global.OneSignal.config = {};
    global.OneSignal.initialized = true;
    if (config.environment) {
      Environment.getEnv = () => config.environment;
    }
    return global.OneSignal;
  }
}