import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { errorDetailsSchema, type ErrorDetails } from "./error-details.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";

/** The error details. */
export type SubscriptionError = {
  /** The human-readable, unique name of the error. */
  name: string;
  /** The message that describes the error. */
  message: string;
  /** The PayPal internal ID. Used for correlation purposes. */
  debugId: string;
  /**
   * The information link, or URI, that shows detailed information about this error for the
   * developer.
   */
  informationLink?: string;
  /** An array of additional details about the error. */
  details?: ErrorDetails[];
  /** An array of request-related [HATEOAS links](/api/rest/responses/#hateoas-links). */
  links?: LinkDescription[];
};

export const subscriptionErrorSchema: Schema<SubscriptionError> = s.object<SubscriptionError>({
  name: s.string(),
  message: s.string(),
  debugId: s.string(),
  informationLink: s.optional(s.string()),
  details: s.optional(s.array(s.lazy(() => errorDetailsSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    debugId: "debug_id",
    informationLink: "information_link",
  },
});
