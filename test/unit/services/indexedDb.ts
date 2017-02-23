import "../../support/polyfills/polyfills";
import test from "ava";
import IndexedDb from "../../../src/services/IndexedDb";
import Random from "../../support/tester/Random";

test(`should initialized`, async t => {
  try {
    const db = new IndexedDb(Random.getRandomString(10));
  } catch (e) {
    console.error("CAUGHT FATAL TEST ERROR:", e);
  }
});

test(`should get and set value`, async t => {
  try {
    debugger;
    const db = new IndexedDb(Random.getRandomString(10));
    await db.put("Options", {key: 'optionsKey', value: 'optionsValue'});
    const retrievedValue = await db.get("Options", 'optionsKey');
    t.deepEqual(retrievedValue, {key: 'optionsKey', value: 'optionsValue'});
  } catch (e) {
    console.error("CAUGHT FATAL TEST ERROR:", e);
  }
});

test(`should remove value`, async t => {
  try {
    debugger;
    const db = new IndexedDb(Random.getRandomString(10));
    await db.put("Options", {key: 'optionsKey', value: 'optionsValue'});
    await db.remove("Options", 'optionsKey');
    const retrievedValue = await db.get("Options", 'optionsKey');
    t.is(retrievedValue, undefined);
  } catch (e) {
    console.error("CAUGHT FATAL TEST ERROR:", e);
  }
});