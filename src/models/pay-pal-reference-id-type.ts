import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalReferenceIdType = {
  Odr: "ODR",
  Txn: "TXN",
  Sub: "SUB",
  Pap: "PAP",
} as const;
export type PayPalReferenceIdType =
  | (typeof PayPalReferenceIdType)[keyof typeof PayPalReferenceIdType]
  | (string & {});

export const payPalReferenceIdTypeSchema: EnumSchema<PayPalReferenceIdType> =
  s.enumOf<PayPalReferenceIdType>(PayPalReferenceIdType);
