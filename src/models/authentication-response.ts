import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { liabilityShiftIndicatorSchema, type LiabilityShiftIndicator } from "./liability-shift-indicator.js";
import {
  threeDSecureAuthenticationResponseSchema,
  type ThreeDSecureAuthenticationResponse,
} from "./three-dsecure-authentication-response.js";

/** Results of Authentication such as 3D Secure. */
export type AuthenticationResponse = {
  /** Liability shift indicator. The outcome of the issuer's authentication. */
  liabilityShift?: LiabilityShiftIndicator;
  /** Results of 3D Secure Authentication. */
  threeDSecure?: ThreeDSecureAuthenticationResponse;
};

export const authenticationResponseSchema: Schema<AuthenticationResponse> = s.object<AuthenticationResponse>({
  liabilityShift: s.optional(s.lazy(() => liabilityShiftIndicatorSchema)),
  threeDSecure: s.optional(s.lazy(() => threeDSecureAuthenticationResponseSchema)),
  _keysMap: {
    liabilityShift: "liability_shift",
    threeDSecure: "three_d_secure",
  },
});
