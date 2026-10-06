import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  venmoWalletAdditionalAttributesSchema,
  type VenmoWalletAdditionalAttributes,
} from "./venmo-wallet-additional-attributes.js";
import {
  venmoWalletExperienceContextSchema,
  type VenmoWalletExperienceContext,
} from "./venmo-wallet-experience-context.js";

/** Information needed to pay using Venmo. */
export type VenmoWalletRequest = {
  /**
   * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
   * merchant's server so the saved payment source can be used for future transactions.
   */
  vaultId?: string;
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /**
   * Customizes the buyer experience during the approval process for payment with Venmo. Note:
   * Partners and Marketplaces might configure shipping_preference during partner account setup,
   * which overrides the request values.
   */
  experienceContext?: VenmoWalletExperienceContext;
  /** Additional attributes associated with the use of this Venmo Wallet. */
  attributes?: VenmoWalletAdditionalAttributes;
};

export const venmoWalletRequestSchema: Schema<VenmoWalletRequest> = s.object<VenmoWalletRequest>({
  vaultId: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  experienceContext: s.optional(s.lazy(() => venmoWalletExperienceContextSchema)),
  attributes: s.optional(s.lazy(() => venmoWalletAdditionalAttributesSchema)),
  _keysMap: {
    vaultId: "vault_id",
    emailAddress: "email_address",
    experienceContext: "experience_context",
  },
});
