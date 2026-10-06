import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { lineItemSchema, type LineItem } from "./line-item.js";
import { moneySchema, type Money } from "./money.js";

/**
 * The level 3 card processing data collections, If your merchant account has been configured for
 * Level 3 processing this field will be passed to the processor on your behalf. Please contact your
 * PayPal Technical Account Manager to define level 3 data for your business.
 */
export type Level3CardProcessingData = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  dutyAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  discountAmount?: Money;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  shippingAddress?: Address;
  /** Use this field to specify the postal code of the shipping location. */
  shipsFromPostalCode?: string;
  /**
   * A list of the items that were purchased with this payment. If your merchant account has been
   * configured for Level 3 processing this field will be passed to the processor on your behalf.
   */
  lineItems?: LineItem[];
};

export const level3CardProcessingDataSchema: Schema<Level3CardProcessingData> =
  s.object<Level3CardProcessingData>({
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    dutyAmount: s.optional(s.lazy(() => moneySchema)),
    discountAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => addressSchema)),
    shipsFromPostalCode: s.optional(s.string()),
    lineItems: s.optional(s.array(s.lazy(() => lineItemSchema))),
    _keysMap: {
      shippingAmount: "shipping_amount",
      dutyAmount: "duty_amount",
      discountAmount: "discount_amount",
      shippingAddress: "shipping_address",
      shipsFromPostalCode: "ships_from_postal_code",
      lineItems: "line_items",
    },
  });
