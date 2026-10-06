import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The PayPal reference ID type. */
export const PayPalReferenceIdType = {
  /** An order ID. */
  Odr: "ODR",
  /** A transaction ID. */
  Txn: "TXN",
  /** A subscription ID. */
  Sub: "SUB",
  /** A pre-approved payment ID. */
  Pap: "PAP",
} as const;
export type PayPalReferenceIdType =
  | (typeof PayPalReferenceIdType)[keyof typeof PayPalReferenceIdType]
  | (string & {});

export const payPalReferenceIdTypeSchema: EnumSchema<PayPalReferenceIdType> =
  s.enumOf<PayPalReferenceIdType>(PayPalReferenceIdType);
