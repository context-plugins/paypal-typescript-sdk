import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { experienceContextSchema, type ExperienceContext } from "./experience-context.js";

export type GiropayPaymentRequest = {
  name: string;
  countryCode: string;
  experienceContext?: ExperienceContext;
};

export const giropayPaymentRequestSchema: Schema<GiropayPaymentRequest> = s.object<GiropayPaymentRequest>({
  name: s.string(),
  countryCode: s.string(),
  experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
  },
});
