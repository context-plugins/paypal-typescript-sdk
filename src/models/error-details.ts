import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";

export type ErrorDetails = {
  field?: string;
  value?: string;
  location?: string;
  issue: string;
  links?: LinkDescription[];
  description?: string;
};

export const errorDetailsSchema: Schema<ErrorDetails> = s.object<ErrorDetails>({
  field: s.optional(s.string()),
  value: s.optional(s.string()),
  location: s.optional(s.string()),
  issue: s.string(),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  description: s.optional(s.string()),
});
