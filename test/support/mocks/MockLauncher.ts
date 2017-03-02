import { hasCssClass, addCssClass, removeCssClass, nothing, contains, once } from '../utils';
import * as log from 'loglevel';
import ActiveAnimatedElement from './ActiveAnimatedElement';
import { InvalidStateError, InvalidStateReason } from "../errors/InvalidStateError";
import MockDummy from "./MockDummy";
import Launcher from "../../../src/bell/Launcher";


export default class MockLauncher extends Launcher {
    async resize() {
      return undefined;
    }

    async show() {
      return undefined;
    }

    async hide() {
      return undefined;
    }

    async inactivate() {
      return undefined;
    }

    async activate() {
      return undefined;
    }
}