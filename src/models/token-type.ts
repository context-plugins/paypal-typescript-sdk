import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const TokenType = {
  BillingAgreement: "BILLING_AGREEMENT",
} as const;
export type TokenType = (typeof TokenType)[keyof typeof TokenType] | (string & {});

export const tokenTypeSchema: EnumSchema<TokenType> = s.enumOf<TokenType>(TokenType);
