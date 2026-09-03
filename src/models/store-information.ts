import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type StoreInformation = {
  storeId?: string;
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
