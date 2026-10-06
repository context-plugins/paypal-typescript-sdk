import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationStatusDetailsSchema,
  type AuthorizationStatusDetails,
} from "./authorization-status-details.js";
import { authorizationStatusSchema, type AuthorizationStatus } from "./authorization-status.js";

/** The status fields and status details for an authorized payment. */
export type AuthorizationStatusWithDetails = {
  /** The status for the authorized payment. */
  status?: AuthorizationStatus;
  /** The details of the authorized payment status. */
  statusDetails?: AuthorizationStatusDetails;
};

export const authorizationStatusWithDetailsSchema: Schema<AuthorizationStatusWithDetails> =
  s.object<AuthorizationStatusWithDetails>({
    status: s.optional(s.lazy(() => authorizationStatusSchema)),
    statusDetails: s.optional(s.lazy(() => authorizationStatusDetailsSchema)),
    _keysMap: {
      statusDetails: "status_details",
    },
  });
