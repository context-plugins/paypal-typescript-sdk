import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationIncompleteReasonSchema,
  type AuthorizationIncompleteReason,
} from "./authorization-incomplete-reason.js";

/** The details of the authorized payment status. */
export type AuthorizationStatusDetails = {
  /** The reason why the authorized status is `PENDING`. */
  reason?: AuthorizationIncompleteReason;
};

export const authorizationStatusDetailsSchema: Schema<AuthorizationStatusDetails> =
  s.object<AuthorizationStatusDetails>({
    reason: s.optional(s.lazy(() => authorizationIncompleteReasonSchema)),
  });
