import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** A checkout option as a name-and-value pair. */
export type CheckoutOption = {
  /** The checkout option name, such as `color` or `texture`. */
  checkoutOptionName?: string;
  /**
   * The checkout option value. For example, the checkout option `color` might be `blue` or `red`
   * while the checkout option `texture` might be `smooth` or `rippled`.
   */
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
