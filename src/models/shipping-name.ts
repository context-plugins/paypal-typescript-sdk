import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ShippingName = {
  fullName?: string;
};

export const shippingNameSchema: Schema<ShippingName> = s.object<ShippingName>({
  fullName: s.optional(s.string()),
  _keysMap: {
    fullName: "full_name",
  },
});
