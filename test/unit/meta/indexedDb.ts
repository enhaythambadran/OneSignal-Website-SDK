import "../../support/polyfills/polyfills";
import test from "ava";
import IndexedDb from "../../../src/IndexedDb";

function attemptToOpenIndexedDb() {
  try {
    try {
      var request = indexedDB.open("ONE_SIGNAL_SDK_DB", 1);
    } catch (e) {
      console.error("Error calling indexedDB.open():", e);
    }

    request.onblocked = e => {
      console.log("indexedDB.open() blocked event:", event);
    };
    request.onsuccess = ({target}) => {
      let db = (<any>target).result;
      console.log("indexedDB.open() success event. Database:", db);
      db.onversionchange = (event) => {
        console.log("indexedDB.open() versionchange event:", event);
        db.close();
      };
    };
    request.onerror = (event) => {
      const error = (<any>event.target).error;
      console.error('indexedDB.open() error event. Error:', error.name + ': ' + error.message);
    };
    request.onupgradeneeded = (event) => {
      console.log('indexedDB.open() onupgradeneeded event.');
      let db = (<any>event.target).result;
      db.createObjectStore("Ids", {
        keyPath: "type"
      });
      db.createObjectStore("NotificationOpened", {
        keyPath: "url"
      });
      db.createObjectStore("Options", {
        keyPath: "key"
      });
    };
  } catch (e) {
    console.error("CAUGHT FATAL TEST ERROR:", e);
  }
}

test(`IndexedDB can be initialized`, async t => {
  /*
    Because async functions are implemented only in ES7, and because the JS ecosystem is mostly just catching up to
    ES6, async/await is transpiled to generator functions, which are actually functions, and not promises.

    t.throws() would work on async functions if only they returned promises. But ES5 transpilation (even ES6
    transpilation) changes the method return type from a Promise to a function.

    https://gist.github.com/jasonpang/ae41a814e99f21238c302bf2a4da0df5
   */
  console.log("RUNNING TEST");
  try {
    const db = await IndexedDb.getInstance();
    console.log("Database:", db);
  } catch (e) {
    console.error("CAUGHT FATAL TEST ERROR:", e);
  }
});