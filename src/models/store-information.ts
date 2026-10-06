import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The store information. */
export type StoreInformation = {
  /** The ID of a store for a merchant in the system of record. */
  storeId?: string;
  /** The terminal ID for the checkout stand in a merchant store. */
  terminalId?: string;
};

export const storeInformationSchema: Schema<StoreInformation> = s.object<StoreInformation>({
  storeId: s.optional(s.string()),
  terminalId: s.optional(s.string()),
  _keysMap: {
    storeId: "store_id",
    terminalId: "terminal_id",
  },
});
