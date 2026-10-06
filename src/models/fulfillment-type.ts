import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * A classification for the method of purchase fulfillment (e.g shipping, in-store pickup, etc).
 * Either `type` or `options` may be present, but not both.
 */
export const FulfillmentType = {
  /** The payer intends to receive the items at a specified address. */
  Shipping: "SHIPPING",
  /** DEPRECATED. Please use "PICKUP_FROM_PERSON" instead. */
  PickupInPerson: "PICKUP_IN_PERSON",
  /**
   * The payer intends to pick up the item(s) from the payee's physical store. Also termed as BOPIS,
   * "Buy Online, Pick-up in Store". Seller protection is provided with this option.
   */
  PickupInStore: "PICKUP_IN_STORE",
  /**
   * The payer intends to pick up the item(s) from the payee in person. Also termed as BOPIP, "Buy
   * Online, Pick-up in Person". Seller protection is not available, since the payer is receiving
   * the item from the payee in person, and can validate the item prior to payment.
   */
  PickupFromPerson: "PICKUP_FROM_PERSON",
} as const;
export type FulfillmentType = (typeof FulfillmentType)[keyof typeof FulfillmentType] | (string & {});

export const fulfillmentTypeSchema: EnumSchema<FulfillmentType> = s.enumOf<FulfillmentType>(FulfillmentType);
