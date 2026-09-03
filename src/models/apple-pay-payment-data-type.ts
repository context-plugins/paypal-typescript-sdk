import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ApplePayPaymentDataType = {
  _3Dsecure: "3DSECURE",
  Emv: "EMV",
} as const;
export type ApplePayPaymentDataType =
  | (typeof ApplePayPaymentDataType)[keyof typeof ApplePayPaymentDataType]
  | (string & {});

export const applePayPaymentDataTypeSchema: EnumSchema<ApplePayPaymentDataType> =
  s.enumOf<ApplePayPaymentDataType>(ApplePayPaymentDataType);
