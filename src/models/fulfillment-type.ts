import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const FulfillmentType = {
  Shipping: "SHIPPING",
  PickupInPerson: "PICKUP_IN_PERSON",
  PickupInStore: "PICKUP_IN_STORE",
  PickupFromPerson: "PICKUP_FROM_PERSON",
} as const;
export type FulfillmentType = (typeof FulfillmentType)[keyof typeof FulfillmentType] | (string & {});

export const fulfillmentTypeSchema: EnumSchema<FulfillmentType> = s.enumOf<FulfillmentType>(FulfillmentType);
