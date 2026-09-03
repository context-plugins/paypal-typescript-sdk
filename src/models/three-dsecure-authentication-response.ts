import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { enrollmentStatusSchema, type EnrollmentStatus } from "./enrollment-status.js";
import { paResStatusSchema, type PaResStatus } from "./pa-res-status.js";

export type ThreeDSecureAuthenticationResponse = {
  authenticationStatus?: PaResStatus;
  enrollmentStatus?: EnrollmentStatus;
};

export const threeDSecureAuthenticationResponseSchema: Schema<ThreeDSecureAuthenticationResponse> =
  s.object<ThreeDSecureAuthenticationResponse>({
    authenticationStatus: s.optional(s.lazy(() => paResStatusSchema)),
    enrollmentStatus: s.optional(s.lazy(() => enrollmentStatusSchema)),
    _keysMap: {
      authenticationStatus: "authentication_status",
      enrollmentStatus: "enrollment_status",
    },
  });
