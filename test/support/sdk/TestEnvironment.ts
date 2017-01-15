import OneSignal from "../../../src/OneSignal";
import Environment from "../../../src/Environment";


var global = new Function('return this')();

export interface TestEnvironmentConfig {
  environment: string,
}

export class TestEnvironment {
  static initialize(config?: TestEnvironmentConfig = {}) {
    OneSignal.config = {};
    OneSignal.initialized = true;
    if (config.environment) {
      Environment.getEnv = () => config.environment;
    }
  }
}