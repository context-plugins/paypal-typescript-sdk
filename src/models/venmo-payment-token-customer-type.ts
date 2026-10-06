import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The customer type associated with the Venmo payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export const VenmoPaymentTokenCustomerType = {
  /** The customer vaulting the Venmo payment token is a consumer on the merchant / platform. */
  Consumer: "CONSUMER",
  /** The customer vaulting the Venmo payment token is a business on merchant / platform. */
  Business: "BUSINESS",
} as const;
export type VenmoPaymentTokenCustomerType =
  | (typeof VenmoPaymentTokenCustomerType)[keyof typeof VenmoPaymentTokenCustomerType]
  | (string & {});

export const venmoPaymentTokenCustomerTypeSchema: EnumSchema<VenmoPaymentTokenCustomerType> =
  s.enumOf<VenmoPaymentTokenCustomerType>(VenmoPaymentTokenCustomerType);
