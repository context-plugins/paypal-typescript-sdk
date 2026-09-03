import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type SepaDebitExperienceContext = {
  locale?: string;
  returnUrl: string;
  cancelUrl: string;
};

export const sepaDebitExperienceContextSchema: Schema<SepaDebitExperienceContext> =
  s.object<SepaDebitExperienceContext>({
    locale: s.optional(s.string()),
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
    },
  });
