import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { payPalReferenceIdTypeSchema, type PayPalReferenceIdType } from "./pay-pal-reference-id-type.js";

export type TransactionInformation = {
  paypalAccountId?: string;
  transactionId?: string;
  paypalReferenceId?: string;
  paypalReferenceIdType?: PayPalReferenceIdType;
  transactionEventCode?: string;
  transactionInitiationDate?: string;
  transactionUpdatedDate?: string;
  transactionAmount?: Money;
  feeAmount?: Money;
  discountAmount?: Money;
  insuranceAmount?: Money;
  salesTaxAmount?: Money;
  shippingAmount?: Money;
  shippingDiscountAmount?: Money;
  shippingTaxAmount?: Money;
  otherAmount?: Money;
  tipAmount?: Money;
  transactionStatus?: string;
  transactionSubject?: string;
  transactionNote?: string;
  paymentTrackingId?: string;
  bankReferenceId?: string;
  endingBalance?: Money;
  availableBalance?: Money;
  invoiceId?: string;
  customField?: string;
  protectionEligibility?: string;
  creditTerm?: string;
  creditTransactionalFee?: Money;
  creditPromotionalFee?: Money;
  annualPercentageRate?: string;
  paymentMethodType?: string;
  instrumentType?: string;
  instrumentSubType?: string;
};

export const transactionInformationSchema: Schema<TransactionInformation> = s.object<TransactionInformation>({
  paypalAccountId: s.optional(s.string()),
  transactionId: s.optional(s.string()),
  paypalReferenceId: s.optional(s.string()),
  paypalReferenceIdType: s.optional(s.lazy(() => payPalReferenceIdTypeSchema)),
  transactionEventCode: s.optional(s.string()),
  transactionInitiationDate: s.optional(s.string()),
  transactionUpdatedDate: s.optional(s.string()),
  transactionAmount: s.optional(s.lazy(() => moneySchema)),
  feeAmount: s.optional(s.lazy(() => moneySchema)),
  discountAmount: s.optional(s.lazy(() => moneySchema)),
  insuranceAmount: s.optional(s.lazy(() => moneySchema)),
  salesTaxAmount: s.optional(s.lazy(() => moneySchema)),
  shippingAmount: s.optional(s.lazy(() => moneySchema)),
  shippingDiscountAmount: s.optional(s.lazy(() => moneySchema)),
  shippingTaxAmount: s.optional(s.lazy(() => moneySchema)),
  otherAmount: s.optional(s.lazy(() => moneySchema)),
  tipAmount: s.optional(s.lazy(() => moneySchema)),
  transactionStatus: s.optional(s.string()),
  transactionSubject: s.optional(s.string()),
  transactionNote: s.optional(s.string()),
  paymentTrackingId: s.optional(s.string()),
  bankReferenceId: s.optional(s.string()),
  endingBalance: s.optional(s.lazy(() => moneySchema)),
  availableBalance: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  customField: s.optional(s.string()),
  protectionEligibility: s.optional(s.string()),
  creditTerm: s.optional(s.string()),
  creditTransactionalFee: s.optional(s.lazy(() => moneySchema)),
  creditPromotionalFee: s.optional(s.lazy(() => moneySchema)),
  annualPercentageRate: s.optional(s.string()),
  paymentMethodType: s.optional(s.string()),
  instrumentType: s.optional(s.string()),
  instrumentSubType: s.optional(s.string()),
  _keysMap: {
    paypalAccountId: "paypal_account_id",
    transactionId: "transaction_id",
    paypalReferenceId: "paypal_reference_id",
    paypalReferenceIdType: "paypal_reference_id_type",
    transactionEventCode: "transaction_event_code",
    transactionInitiationDate: "transaction_initiation_date",
    transactionUpdatedDate: "transaction_updated_date",
    transactionAmount: "transaction_amount",
    feeAmount: "fee_amount",
    discountAmount: "discount_amount",
    insuranceAmount: "insurance_amount",
    salesTaxAmount: "sales_tax_amount",
    shippingAmount: "shipping_amount",
    shippingDiscountAmount: "shipping_discount_amount",
    shippingTaxAmount: "shipping_tax_amount",
    otherAmount: "other_amount",
    tipAmount: "tip_amount",
    transactionStatus: "transaction_status",
    transactionSubject: "transaction_subject",
    transactionNote: "transaction_note",
    paymentTrackingId: "payment_tracking_id",
    bankReferenceId: "bank_reference_id",
    endingBalance: "ending_balance",
    availableBalance: "available_balance",
    invoiceId: "invoice_id",
    customField: "custom_field",
    protectionEligibility: "protection_eligibility",
    creditTerm: "credit_term",
    creditTransactionalFee: "credit_transactional_fee",
    creditPromotionalFee: "credit_promotional_fee",
    annualPercentageRate: "annual_percentage_rate",
    paymentMethodType: "payment_method_type",
    instrumentType: "instrument_type",
    instrumentSubType: "instrument_sub_type",
  },
});
