import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VenmoPaymentTokenCustomerType = {
  Consumer: "CONSUMER",
  Business: "BUSINESS",
} as const;
export type VenmoPaymentTokenCustomerType =
  | (typeof VenmoPaymentTokenCustomerType)[keyof typeof VenmoPaymentTokenCustomerType]
  | (string & {});

export const venmoPaymentTokenCustomerTypeSchema: EnumSchema<VenmoPaymentTokenCustomerType> =
  s.enumOf<VenmoPaymentTokenCustomerType>(VenmoPaymentTokenCustomerType);
