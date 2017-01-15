import '../../support/polyfills/polyfills';
import test from 'ava';
import OneSignal from "../../../src/OneSignal";
import {InvalidArgumentError, InvalidArgumentReason} from "../../../src/errors/InvalidArgumentError";
import LimitStore from "../../../src/LimitStore";
import Database from "../../../src/Database";
import OneSignalError from "../../../src/errors/OneSignalError";
import {throws} from "../../support/tester/asyncFunctions";
import Macros from '../../support/tester/Macros';
import '../../support/polyfills/polyfills';


test("macro expectInvalidArgumentError", Macros.expectInvalidArgumentError, (param) => {
  throw new InvalidArgumentError("param", InvalidArgumentReason.Empty);
});