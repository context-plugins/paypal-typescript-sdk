import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Information about the decrypted apple pay payment data for the token like cryptogram, eci
 * indicator.
 */
export type ApplePayPaymentData = {
  /**
   * Online payment cryptogram, as defined by 3D Secure. The pattern is defined by an external party
   * and supports Unicode.
   */
  cryptogram?: string;
  /**
   * ECI indicator, as defined by 3- Secure. The pattern is defined by an external party and
   * supports Unicode.
   */
  eciIndicator?: string;
  /**
   * Encoded Apple Pay EMV Payment Structure used for payments in China. The pattern is defined by
   * an external party and supports Unicode.
   */
  emvData?: string;
  /**
   * Bank Key encrypted Apple Pay PIN. The pattern is defined by an external party and supports
   * Unicode.
   */
  pin?: string;
};

export const applePayPaymentDataSchema: Schema<ApplePayPaymentData> = s.object<ApplePayPaymentData>({
  cryptogram: s.optional(s.string()),
  eciIndicator: s.optional(s.string()),
  emvData: s.optional(s.string()),
  pin: s.optional(s.string()),
  _keysMap: {
    eciIndicator: "eci_indicator",
    emvData: "emv_data",
  },
});
