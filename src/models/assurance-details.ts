import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Information about cardholder possession validation and cardholder identification and
 * verifications (ID&V).
 */
export type AssuranceDetails = {
  /**
   * If true, indicates that Cardholder possession validation has been performed on returned payment
   * credential.
   *
   * @default false
   */
  accountVerified?: boolean;
  /**
   * If true, indicates that identification and verifications (ID&V) was performed on the returned
   * payment credential.If false, the same risk-based authentication can be performed as you would
   * for card transactions. This risk-based authentication can include, but not limited to, step-up
   * with 3D Secure protocol if applicable.
   *
   * @default false
   */
  cardHolderAuthenticated?: boolean;
};

export const assuranceDetailsSchema: Schema<AssuranceDetails> = s.object<AssuranceDetails>({
  accountVerified: s.defaulted(s.boolean(), false),
  cardHolderAuthenticated: s.defaulted(s.boolean(), false),
  _keysMap: {
    accountVerified: "account_verified",
    cardHolderAuthenticated: "card_holder_authenticated",
  },
});
