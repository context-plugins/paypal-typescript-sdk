import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { experienceContextSchema, type ExperienceContext } from "./experience-context.js";

export type SofortPaymentRequest = {
  name: string;
  countryCode: string;
  experienceContext?: ExperienceContext;
};

export const sofortPaymentRequestSchema: Schema<SofortPaymentRequest> = s.object<SofortPaymentRequest>({
  name: s.string(),
  countryCode: s.string(),
  experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
  },
});
