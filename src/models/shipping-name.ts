import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The name of the party. */
export type ShippingName = {
  /** When the party is a person, the party's full name. */
  fullName?: string;
};

export const shippingNameSchema: Schema<ShippingName> = s.object<ShippingName>({
  fullName: s.optional(s.string()),
  _keysMap: {
    fullName: "full_name",
  },
});
