import { DEV_HOST, DEV_FRAME_HOST, PROD_HOST, API_URL, STAGING_FRAME_HOST, DEV_PREFIX, STAGING_PREFIX } from '../vars';
import Environment from '../Environment';
import OneSignalApi from '../OneSignalApi';
import * as log from 'loglevel';
import LimitStore from '../LimitStore';
import Event from "../Event";
import Database from '../Database';
import * as Browser from 'bowser';
import {
  getConsoleStyle, contains, normalizeSubdomain, getDeviceTypeForBrowser, capitalize,
  awaitOneSignalInitAndSupported
} from '../utils';
import * as objectAssign from 'object-assign';
import * as EventEmitter from 'wolfy87-eventemitter';
import * as heir from 'heir';
import * as swivel from 'swivel';
import Postmam from '../Postmam';
import * as Cookie from 'js-cookie';
import HttpModal from "../http-modal/HttpModal";
import Bell from "../bell/Bell";
import SubscriptionHelper from "./SubscriptionHelper";
import EventHelper from "./EventHelper";
declare var OneSignal: any;


export default class TestHelper {
  /**
   * Just for debugging purposes, removes the coookie from hiding the native prompt.
   * @returns {*}
   */
  static unmarkHttpsNativePromptDismissed() {
    if (Cookie.remove('onesignal-notification-prompt')) {
      log.debug('OneSignal: Removed the native notification prompt dismissed cookie.')
    } else {
      log.debug('OneSignal: Cookie not marked.');
    }
  }

  /**
   * Creates a session cookie to note that the user does not want to be disturbed for the rest of the browser session.
   */
  static markHttpsNativePromptDismissed() {
    log.debug('OneSignal: User dismissed the native notification prompt; storing flag.');
    return Cookie.set('onesignal-notification-prompt', 'dismissed', {
      // In 8 hours, or 1/3 of the day
      expires: 0.333
    });
  }
}