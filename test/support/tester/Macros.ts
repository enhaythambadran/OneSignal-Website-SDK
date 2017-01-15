import test from 'ava';
import OneSignal from "../../../src/OneSignal";
import {InvalidArgumentError, InvalidArgumentReason} from "../../../src/errors/InvalidArgumentError";
import LimitStore from "../../../src/LimitStore";
import Database from "../../../src/Database";
import OneSignalError from "../../../src/errors/OneSignalError";
import {throws} from "../../support/tester/asyncFunctions";


/* See: https://github.com/avajs/ava#test-macros */
export default class Macros {
  static async expectInvalidArgumentError(t, action: Action<any>, ...args) {
    await throws(t, action.bind(null, args), InvalidArgumentError);
  }
}