import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { enrollmentStatusSchema, type EnrollmentStatus } from "./enrollment-status.js";
import { paResStatusSchema, type PaResStatus } from "./pa-res-status.js";

/** Results of 3D Secure Authentication. */
export type ThreeDSecureAuthenticationResponse = {
  /** Transactions status result identifier. The outcome of the issuer's authentication. */
  authenticationStatus?: PaResStatus;
  /** Status of Authentication eligibility. */
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
