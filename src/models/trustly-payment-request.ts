import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { experienceContextSchema, type ExperienceContext } from "./experience-context.js";

export type TrustlyPaymentRequest = {
  name: string;
  countryCode: string;
  email: string;
  experienceContext?: ExperienceContext;
};

export const trustlyPaymentRequestSchema: Schema<TrustlyPaymentRequest> = s.object<TrustlyPaymentRequest>({
  name: s.string(),
  countryCode: s.string(),
  email: s.string(),
  experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
  },
});
