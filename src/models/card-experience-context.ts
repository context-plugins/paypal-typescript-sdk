import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Customizes the payer experience during the 3DS Approval for payment. */
export type CardExperienceContext = {
  /** Describes the URL. */
  returnUrl?: string;
  /** Describes the URL. */
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
