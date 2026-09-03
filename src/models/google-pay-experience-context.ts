import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type GooglePayExperienceContext = {
  returnUrl: string;
  cancelUrl: string;
};

export const googlePayExperienceContextSchema: Schema<GooglePayExperienceContext> =
  s.object<GooglePayExperienceContext>({
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
    },
  });
