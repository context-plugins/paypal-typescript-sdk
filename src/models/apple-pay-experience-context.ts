import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Customizes the payer experience during the approval process for the payment. */
export type ApplePayExperienceContext = {
  /** Describes the URL. */
  returnUrl: string;
  /** Describes the URL. */
  cancelUrl: string;
};

export const applePayExperienceContextSchema: Schema<ApplePayExperienceContext> =
  s.object<ApplePayExperienceContext>({
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
    },
  });
