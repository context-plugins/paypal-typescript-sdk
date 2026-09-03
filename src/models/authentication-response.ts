import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { liabilityShiftIndicatorSchema, type LiabilityShiftIndicator } from "./liability-shift-indicator.js";
import {
  threeDSecureAuthenticationResponseSchema,
  type ThreeDSecureAuthenticationResponse,
} from "./three-dsecure-authentication-response.js";

export type AuthenticationResponse = {
  liabilityShift?: LiabilityShiftIndicator;
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
