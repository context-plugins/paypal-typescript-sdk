import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ShippingType = {
  Shipping: "SHIPPING",
  Pickup: "PICKUP",
  PickupInStore: "PICKUP_IN_STORE",
  PickupFromPerson: "PICKUP_FROM_PERSON",
} as const;
export type ShippingType = (typeof ShippingType)[keyof typeof ShippingType] | (string & {});

export const shippingTypeSchema: EnumSchema<ShippingType> = s.enumOf<ShippingType>(ShippingType);
