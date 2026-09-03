import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationStatusDetailsSchema,
  type AuthorizationStatusDetails,
} from "./authorization-status-details.js";
import { authorizationStatusSchema, type AuthorizationStatus } from "./authorization-status.js";

export type AuthorizationStatusWithDetails = {
  status?: AuthorizationStatus;
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
