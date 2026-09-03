import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { enrollmentStatusSchema, type EnrollmentStatus } from "./enrollment-status.js";
import { paResStatusSchema, type PaResStatus } from "./pa-res-status.js";

export type ThreeDSecureCardAuthenticationResponse = {
  authenticationStatus?: PaResStatus;
  enrollmentStatus?: EnrollmentStatus;
  authenticationId?: string;
};

export const threeDSecureCardAuthenticationResponseSchema: Schema<ThreeDSecureCardAuthenticationResponse> =
  s.object<ThreeDSecureCardAuthenticationResponse>({
    authenticationStatus: s.optional(s.lazy(() => paResStatusSchema)),
    enrollmentStatus: s.optional(s.lazy(() => enrollmentStatusSchema)),
    authenticationId: s.optional(s.string()),
    _keysMap: {
      authenticationStatus: "authentication_status",
      enrollmentStatus: "enrollment_status",
      authenticationId: "authentication_id",
    },
  });
