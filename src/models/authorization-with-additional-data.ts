import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationStatusDetailsSchema,
  type AuthorizationStatusDetails,
} from "./authorization-status-details.js";
import { authorizationStatusSchema, type AuthorizationStatus } from "./authorization-status.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { networkTransactionSchema, type NetworkTransaction } from "./network-transaction.js";
import { processorResponseSchema, type ProcessorResponse } from "./processor-response.js";
import { sellerProtectionSchema, type SellerProtection } from "./seller-protection.js";

export type AuthorizationWithAdditionalData = {
  status?: AuthorizationStatus;
  statusDetails?: AuthorizationStatusDetails;
  id?: string;
  amount?: Money;
  invoiceId?: string;
  customId?: string;
  networkTransactionReference?: NetworkTransaction;
  sellerProtection?: SellerProtection;
  expirationTime?: string;
  links?: LinkDescription[];
  createTime?: string;
  updateTime?: string;
  processorResponse?: ProcessorResponse;
};

export const authorizationWithAdditionalDataSchema: Schema<AuthorizationWithAdditionalData> =
  s.object<AuthorizationWithAdditionalData>({
    status: s.optional(s.lazy(() => authorizationStatusSchema)),
    statusDetails: s.optional(s.lazy(() => authorizationStatusDetailsSchema)),
    id: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneySchema)),
    invoiceId: s.optional(s.string()),
    customId: s.optional(s.string()),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
    sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
    expirationTime: s.optional(s.string()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    processorResponse: s.optional(s.lazy(() => processorResponseSchema)),
    _keysMap: {
      statusDetails: "status_details",
      invoiceId: "invoice_id",
      customId: "custom_id",
      networkTransactionReference: "network_transaction_reference",
      sellerProtection: "seller_protection",
      expirationTime: "expiration_time",
      createTime: "create_time",
      updateTime: "update_time",
      processorResponse: "processor_response",
    },
  });
