import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The tokenization method that generated the ID. */
export const TokenType = {
  /**
   * The PayPal billing agreement ID. References an approved recurring payment for goods or
   * services.
   */
  BillingAgreement: "BILLING_AGREEMENT",
} as const;
export type TokenType = (typeof TokenType)[keyof typeof TokenType] | (string & {});

export const tokenTypeSchema: EnumSchema<TokenType> = s.enumOf<TokenType>(TokenType);
