import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OrderApplicationContextShippingPreference = {
  GetFromFile: "GET_FROM_FILE",
  NoShipping: "NO_SHIPPING",
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type OrderApplicationContextShippingPreference =
  | (typeof OrderApplicationContextShippingPreference)[keyof typeof OrderApplicationContextShippingPreference]
  | (string & {});

export const orderApplicationContextShippingPreferenceSchema: EnumSchema<OrderApplicationContextShippingPreference> =
  s.enumOf<OrderApplicationContextShippingPreference>(OrderApplicationContextShippingPreference);
