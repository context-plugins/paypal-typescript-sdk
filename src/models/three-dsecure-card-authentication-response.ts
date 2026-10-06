import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { enrollmentStatusSchema, type EnrollmentStatus } from "./enrollment-status.js";
import { paResStatusSchema, type PaResStatus } from "./pa-res-status.js";

/** Results of 3D Secure Authentication. */
export type ThreeDSecureCardAuthenticationResponse = {
  /** Transactions status result identifier. The outcome of the issuer's authentication. */
  authenticationStatus?: PaResStatus;
  /** Status of Authentication eligibility. */
  enrollmentStatus?: EnrollmentStatus;
  /**
   * The externally received 3ds authentication id, to be returned in card detokenization response.
   */
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
