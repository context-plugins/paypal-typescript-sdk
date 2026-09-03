import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ApplePayPaymentData = {
  cryptogram?: string;
  eciIndicator?: string;
  emvData?: string;
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
