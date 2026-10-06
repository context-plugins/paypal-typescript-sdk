import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  threeDSecureCardAuthenticationResponseSchema,
  type ThreeDSecureCardAuthenticationResponse,
} from "./three-dsecure-card-authentication-response.js";

/** Results of Authentication such as 3D Secure. */
export type CardAuthenticationResponse = {
  /** Results of 3D Secure Authentication. */
  threeDSecure?: ThreeDSecureCardAuthenticationResponse;
};

export const cardAuthenticationResponseSchema: Schema<CardAuthenticationResponse> =
  s.object<CardAuthenticationResponse>({
    threeDSecure: s.optional(s.lazy(() => threeDSecureCardAuthenticationResponseSchema)),
    _keysMap: {
      threeDSecure: "three_d_secure",
    },
  });
