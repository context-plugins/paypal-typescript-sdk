import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationIncompleteReasonSchema,
  type AuthorizationIncompleteReason,
} from "./authorization-incomplete-reason.js";

export type AuthorizationStatusDetails = {
  reason?: AuthorizationIncompleteReason;
};

export const authorizationStatusDetailsSchema: Schema<AuthorizationStatusDetails> =
  s.object<AuthorizationStatusDetails>({
    reason: s.optional(s.lazy(() => authorizationIncompleteReasonSchema)),
  });
