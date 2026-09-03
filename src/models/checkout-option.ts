import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type CheckoutOption = {
  checkoutOptionName?: string;
  checkoutOptionValue?: string;
};

export const checkoutOptionSchema: Schema<CheckoutOption> = s.object<CheckoutOption>({
  checkoutOptionName: s.optional(s.string()),
  checkoutOptionValue: s.optional(s.string()),
  _keysMap: {
    checkoutOptionName: "checkout_option_name",
    checkoutOptionValue: "checkout_option_value",
  },
});
