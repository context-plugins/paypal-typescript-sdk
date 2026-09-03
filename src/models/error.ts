import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { errorDetailsSchema, type ErrorDetails } from "./error-details.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";

export type Error = {
  name: string;
  message: string;
  debugId: string;
  details?: ErrorDetails[];
  links?: LinkDescription[];
};

export const errorSchema: Schema<Error> = s.object<Error>({
  name: s.string(),
  message: s.string(),
  debugId: s.string(),
  details: s.optional(s.array(s.lazy(() => errorDetailsSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    debugId: "debug_id",
  },
});
