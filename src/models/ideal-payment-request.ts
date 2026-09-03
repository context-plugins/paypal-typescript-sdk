import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { experienceContextSchema, type ExperienceContext } from "./experience-context.js";

export type IDealPaymentRequest = {
  name: string;
  countryCode: string;
  bic?: string;
  experienceContext?: ExperienceContext;
};

export const iDealPaymentRequestSchema: Schema<IDealPaymentRequest> = s.object<IDealPaymentRequest>({
  name: s.string(),
  countryCode: s.string(),
  bic: s.optional(s.string()),
  experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
  },
});
