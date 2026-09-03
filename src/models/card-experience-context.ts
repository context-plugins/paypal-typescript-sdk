import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type CardExperienceContext = {
  returnUrl?: string;
  cancelUrl?: string;
};

export const cardExperienceContextSchema: Schema<CardExperienceContext> = s.object<CardExperienceContext>({
  returnUrl: s.optional(s.string()),
  cancelUrl: s.optional(s.string()),
  _keysMap: {
    returnUrl: "return_url",
    cancelUrl: "cancel_url",
  },
});
