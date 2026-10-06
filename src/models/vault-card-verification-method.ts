import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The verification method of the card. */
export const VaultCardVerificationMethod = {
  /**
   * When an authorization or transaction is attempted this option will return a contingency and
   * HATEOAS link only when local regulations require strong customer authentication, (e.g. 3DS in
   * countries and use cases where it is mandated). The API caller should redirect the payer to the
   * link so that they can authenticate themselves. In all cases, when an authorization is requested
   * the AVS/CVV results will be returned in the response.
   */
  ScaWhenRequired: "SCA_WHEN_REQUIRED",
  /**
   * Selecting this option will attempt to force a strong customer authentication for the
   * authorization/transaction. In countries where SCA has been defined and implemented it will
   * result in a contingency and HATEOAS link being returned. The API caller should redirect the
   * payer to that link so that they can authenticate themselves against their issuing bank or other
   * entity. As noted, the HATEOAS link is only available in all regions where strong authentication
   * is supported, (e.g. in European countries where 3DS is live). Merchants can use this setting as
   * an additional layer of security if they choose to. In all cases, when an authorization is
   * requested the AVS/CVV results will be returned in the response.
   */
  ScaAlways: "SCA_ALWAYS",
} as const;
export type VaultCardVerificationMethod =
  | (typeof VaultCardVerificationMethod)[keyof typeof VaultCardVerificationMethod]
  | (string & {});

export const vaultCardVerificationMethodSchema: EnumSchema<VaultCardVerificationMethod> =
  s.enumOf<VaultCardVerificationMethod>(VaultCardVerificationMethod);
