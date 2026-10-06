import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  sepaDebitExperienceContextSchema,
  type SepaDebitExperienceContext,
} from "./sepa-debit-experience-context.js";

/** An API resource denoting a request to securely store a SEPA Debit. */
export type SepaDebitRequest = {
  /** Customizes the payer experience during the approval process for the SEPA Debit payment. */
  experienceContext?: SepaDebitExperienceContext;
};

export const sepaDebitRequestSchema: Schema<SepaDebitRequest> = s.object<SepaDebitRequest>({
  experienceContext: s.optional(s.lazy(() => sepaDebitExperienceContextSchema)),
  _keysMap: {
    experienceContext: "experience_context",
  },
});
