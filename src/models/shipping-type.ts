import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** A classification for the method of purchase fulfillment. */
export const ShippingType = {
  /** The payer intends to receive the items at a specified address. */
  Shipping: "SHIPPING",
  /**
   * DEPRECATED. To ensure that seller protection is correctly assigned, please use
   * 'PICKUP_IN_STORE' or 'PICKUP_FROM_PERSON' instead. Currently, this field indicates that the
   * payer intends to pick up the items at a specified address (ie. a store address).
   */
  Pickup: "PICKUP",
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
export type ShippingType = (typeof ShippingType)[keyof typeof ShippingType] | (string & {});

export const shippingTypeSchema: EnumSchema<ShippingType> = s.enumOf<ShippingType>(ShippingType);
