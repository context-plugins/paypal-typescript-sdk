import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ApplePayExperienceContext = {
  returnUrl: string;
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
