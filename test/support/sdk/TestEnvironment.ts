
import Environment from "../../../src/Environment";
import OneSignal from "../../../src/OneSignal";


var global = new Function('return this')();

export interface TestEnvironmentConfig {
  environment?: string,
}

export class TestEnvironment {
  static initialize(config: TestEnvironmentConfig = {}) {
    console.log('Initializing test environment.');
    global.OneSignal = new OneSignal();
    global.OneSignal.config = {};
    global.OneSignal.initialized = true;
    if (config.environment) {
      Environment.getEnv = () => config.environment;
    }
    return global.OneSignal;
  }
}