import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { experienceContextSchema, type ExperienceContext } from "./experience-context.js";

export type P24PaymentRequest = {
  name: string;
  email: string;
  countryCode: string;
  experienceContext?: ExperienceContext;
};

export const p24PaymentRequestSchema: Schema<P24PaymentRequest> = s.object<P24PaymentRequest>({
  name: s.string(),
  email: s.string(),
  countryCode: s.string(),
  experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
  },
});
