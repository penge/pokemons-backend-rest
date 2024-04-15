import { test } from "tap";
import getColumnName from "../get-column-name";

test("getColumnName(idOrName)", t => {
  t.equal(getColumnName("001"), "id");
  t.equal(getColumnName("Bulbasaur"), "name");
  t.end();
});
