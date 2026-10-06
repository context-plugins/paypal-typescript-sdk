import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Indicates the type of payment data passed, in case of Non China the payment data is 3DSECURE and
 * for China it is EMV.
 */
export const ApplePayPaymentDataType = {
  /**
   * The card was authenticated using 3D Secure (3DS) authentication scheme. While using this value
   * make sure to populate cryptogram and eci_indicator as part of payment data..
   */
  _3Dsecure: "3DSECURE",
  /**
   * The card was authenticated using EMV method, which is applicable for China. While using this
   * value make sure to pass emv_data and pin as part of payment data.
   */
  Emv: "EMV",
} as const;
export type ApplePayPaymentDataType =
  | (typeof ApplePayPaymentDataType)[keyof typeof ApplePayPaymentDataType]
  | (string & {});

export const applePayPaymentDataTypeSchema: EnumSchema<ApplePayPaymentDataType> =
  s.enumOf<ApplePayPaymentDataType>(ApplePayPaymentDataType);
