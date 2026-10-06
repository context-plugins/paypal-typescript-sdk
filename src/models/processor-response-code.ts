import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Processor response code for the non-PayPal payment processor errors. */
export const ProcessorResponseCode = {
  /** APPROVED. */
  _0000: "0000",
  /** CVV2_FAILURE_POSSIBLE_RETRY_WITH_CVV. */
  _00N7: "00N7",
  /** REFERRAL. */
  _0100: "0100",
  /** ACCOUNT_NOT_FOUND. */
  _0390: "0390",
  /** DO_NOT_HONOR. */
  _0500: "0500",
  /** UNAUTHORIZED_TRANSACTION. */
  _0580: "0580",
  /** BAD_RESPONSE_REVERSAL_REQUIRED. */
  _0800: "0800",
  /** CRYPTOGRAPHIC_FAILURE. */
  _0880: "0880",
  /** UNACCEPTABLE_PIN. */
  _0890: "0890",
  /** SYSTEM_MALFUNCTION. */
  _0960: "0960",
  /** CANCELLED_PAYMENT. */
  _0R00: "0R00",
  /** PARTIAL_AUTHORIZATION. */
  _1000: "1000",
  /** ISSUER_REJECTED. */
  _10Br: "10BR",
  /** INVALID_DATA_FORMAT. */
  _1300: "1300",
  /** INVALID_AMOUNT. */
  _1310: "1310",
  /** INVALID_TRANSACTION_CARD_ISSUER_ACQUIRER. */
  _1312: "1312",
  /** INVALID_CAPTURE_DATE. */
  _1317: "1317",
  /** INVALID_CURRENCY_CODE. */
  _1320: "1320",
  /** INVALID_ACCOUNT. */
  _1330: "1330",
  /** INVALID_ACCOUNT_RECURRING. */
  _1335: "1335",
  /** INVALID_TERMINAL. */
  _1340: "1340",
  /** INVALID_MERCHANT. */
  _1350: "1350",
  /** RESTRICTED_OR_INACTIVE_ACCOUNT. */
  _1352: "1352",
  /** BAD_PROCESSING_CODE. */
  _1360: "1360",
  /** INVALID_MCC. */
  _1370: "1370",
  /** INVALID_EXPIRATION. */
  _1380: "1380",
  /** INVALID_CARD_VERIFICATION_VALUE. */
  _1382: "1382",
  /** INVALID_LIFE_CYCLE_OF_TRANSACTION. */
  _1384: "1384",
  /** INVALID_ORDER. */
  _1390: "1390",
  /** TRANSACTION_CANNOT_BE_COMPLETED. */
  _1393: "1393",
  /** GENERIC_DECLINE. */
  _5100: "5100",
  /** CVV2_FAILURE. */
  _5110: "5110",
  /** INSUFFICIENT_FUNDS. */
  _5120: "5120",
  /** INVALID_PIN. */
  _5130: "5130",
  /** DECLINED_PIN_TRY_EXCEEDED. */
  _5135: "5135",
  /** CARD_CLOSED. */
  _5140: "5140",
  /** PICKUP_CARD_SPECIAL_CONDITIONS. Try using another card. Do not retry the same card. */
  _5150: "5150",
  /** UNAUTHORIZED_USER. */
  _5160: "5160",
  /** AVS_FAILURE. */
  _5170: "5170",
  /** INVALID_OR_RESTRICTED_CARD. Try using another card. Do not retry the same card. */
  _5180: "5180",
  /** SOFT_AVS. */
  _5190: "5190",
  /** DUPLICATE_TRANSACTION. */
  _5200: "5200",
  /** INVALID_TRANSACTION. */
  _5210: "5210",
  /** EXPIRED_CARD. */
  _5400: "5400",
  /** INCORRECT_PIN_REENTER. */
  _5500: "5500",
  /** DECLINED_SCA_REQUIRED. */
  _5650: "5650",
  /** TRANSACTION_NOT_PERMITTED. Outside of scope of accepted business. */
  _5700: "5700",
  /** TX_ATTEMPTS_EXCEED_LIMIT. */
  _5710: "5710",
  /** REVERSAL_REJECTED. */
  _5800: "5800",
  /** INVALID_ISSUE. */
  _5900: "5900",
  /** ISSUER_NOT_AVAILABLE_NOT_RETRIABLE. */
  _5910: "5910",
  /** ISSUER_NOT_AVAILABLE_RETRIABLE. */
  _5920: "5920",
  /** CARD_NOT_ACTIVATED. */
  _5930: "5930",
  /** DECLINED_DUE_TO_UPDATED_ACCOUNT. External decline as an updated card has been issued. */
  _5950: "5950",
  /** ACCOUNT_NOT_ON_FILE. */
  _6300: "6300",
  /** APPROVED_NON_CAPTURE. */
  _7600: "7600",
  /** ERROR_3DS. */
  _7700: "7700",
  /** AUTHENTICATION_FAILED. */
  _7710: "7710",
  /** BIN_ERROR. */
  _7800: "7800",
  /** PIN_ERROR. */
  _7900: "7900",
  /** PROCESSOR_SYSTEM_ERROR. */
  _8000: "8000",
  /** HOST_KEY_ERROR. */
  _8010: "8010",
  /** CONFIGURATION_ERROR. */
  _8020: "8020",
  /** UNSUPPORTED_OPERATION. */
  _8030: "8030",
  /** FATAL_COMMUNICATION_ERROR. */
  _8100: "8100",
  /** RETRIABLE_COMMUNICATION_ERROR. */
  _8110: "8110",
  /** SYSTEM_UNAVAILABLE. */
  _8220: "8220",
  /** DECLINED_PLEASE_RETRY. Retry. */
  _9100: "9100",
  /** SUSPECTED_FRAUD. Try using another card. Do not retry the same card. */
  _9500: "9500",
  /** SECURITY_VIOLATION. */
  _9510: "9510",
  /** LOST_OR_STOLEN. Try using another card. Do not retry the same card. */
  _9520: "9520",
  /** HOLD_CALL_CENTER. The merchant must call the number on the back of the card. POS scenario. */
  _9530: "9530",
  /** REFUSED_CARD. */
  _9540: "9540",
  /** UNRECOGNIZED_RESPONSE_CODE. */
  _9600: "9600",
  /** CONTINGENCIES_NOT_RESOLVED. */
  Pcnr: "PCNR",
  /** CVV_FAILURE. */
  Pcvv: "PCVV",
  /** ACCOUNT_CLOSED. A previously open account is now closed */
  Pp06: "PP06",
  /** REATTEMPT_NOT_PERMITTED. */
  Pprn: "PPRN",
  /** BILLING_ADDRESS. */
  Ppad: "PPAD",
  /** ACCOUNT_BLOCKED_BY_ISSUER. */
  Ppab: "PPAB",
  /** AMEX_DISABLED. */
  Ppae: "PPAE",
  /** ADULT_GAMING_UNSUPPORTED. */
  Ppag: "PPAG",
  /** AMOUNT_INCOMPATIBLE. */
  Ppai: "PPAI",
  /** AUTH_RESULT. */
  Ppar: "PPAR",
  /** MCC_CODE. */
  Ppau: "PPAU",
  /** ARC_AVS. */
  Ppav: "PPAV",
  /** AMOUNT_EXCEEDED. */
  Ppax: "PPAX",
  /** BAD_GAMING. */
  Ppbg: "PPBG",
  /** ARC_CVV. */
  Ppc2: "PPC2",
  /** CE_REGISTRATION_INCOMPLETE. */
  Ppce: "PPCE",
  /** COUNTRY. */
  Ppco: "PPCO",
  /** CREDIT_ERROR. */
  Ppcr: "PPCR",
  /** CARD_TYPE_UNSUPPORTED. */
  Ppct: "PPCT",
  /** CURRENCY_USED_INVALID. */
  Ppcu: "PPCU",
  /** SECURE_ERROR_3DS. */
  Ppd3: "PPD3",
  /** DCC_UNSUPPORTED. */
  Ppdc: "PPDC",
  /** DINERS_REJECT. */
  Ppdi: "PPDI",
  /** AUTH_MESSAGE. */
  Ppdv: "PPDV",
  /** DECLINE_THRESHOLD_BREACH. */
  Ppdt: "PPDT",
  /** EXPIRED_FUNDING_INSTRUMENT. */
  Ppef: "PPEF",
  /** EXCEEDS_FREQUENCY_LIMIT. */
  Ppel: "PPEL",
  /** INTERNAL_SYSTEM_ERROR. */
  Pper: "PPER",
  /** EXPIRY_DATE. */
  Ppex: "PPEX",
  /** FUNDING_SOURCE_ALREADY_EXISTS. */
  Ppfe: "PPFE",
  /** INVALID_FUNDING_INSTRUMENT. */
  Ppfi: "PPFI",
  /** RESTRICTED_FUNDING_INSTRUMENT. */
  Ppfr: "PPFR",
  /** FIELD_VALIDATION_FAILED. */
  Ppfv: "PPFV",
  /** GAMING_REFUND_ERROR. */
  Ppgr: "PPGR",
  /** H1_ERROR. */
  Pph1: "PPH1",
  /** IDEMPOTENCY_FAILURE. */
  Ppif: "PPIF",
  /** INVALID_INPUT_FAILURE. */
  Ppii: "PPII",
  /** ID_MISMATCH. */
  Ppim: "PPIM",
  /** INVALID_TRACE_ID. */
  Ppit: "PPIT",
  /** LATE_REVERSAL. */
  Pplr: "PPLR",
  /** LARGE_STATUS_CODE. */
  Ppls: "PPLS",
  /** MISSING_BUSINESS_RULE_OR_DATA. */
  Ppmb: "PPMB",
  /** BLOCKED_Mastercard. */
  Ppmc: "PPMC",
  /** DEPRECATED The PPMD value has been deprecated. */
  Ppmd: "PPMD",
  /** NOT_SUPPORTED_NRC. */
  Ppnc: "PPNC",
  /** EXCEEDS_NETWORK_FREQUENCY_LIMIT. */
  Ppnl: "PPNL",
  /** NO_MID_FOUND. */
  Ppnm: "PPNM",
  /** NETWORK_ERROR. */
  Ppnt: "PPNT",
  /** NO_PHONE_FOR_DCC_TRANSACTION. */
  Ppph: "PPPH",
  /** INVALID_PRODUCT. */
  Pppi: "PPPI",
  /** INVALID_PAYMENT_METHOD. */
  Pppm: "PPPM",
  /** QUASI_CASH_UNSUPPORTED. */
  Ppqc: "PPQC",
  /** UNSUPPORT_REFUND_ON_PENDING_BC. */
  Ppre: "PPRE",
  /** INVALID_PARENT_TRANSACTION_STATUS. */
  Pprf: "PPRF",
  /** MERCHANT_NOT_REGISTERED. */
  Pprr: "PPRR",
  /** BANKAUTH_ROW_MISMATCH. */
  Pps0: "PPS0",
  /** BANKAUTH_ROW_SETTLED. */
  Pps1: "PPS1",
  /** BANKAUTH_ROW_VOIDED. */
  Pps2: "PPS2",
  /** BANKAUTH_EXPIRED. */
  Pps3: "PPS3",
  /** CURRENCY_MISMATCH. */
  Pps4: "PPS4",
  /** CREDITCARD_MISMATCH. */
  Pps5: "PPS5",
  /** AMOUNT_MISMATCH. */
  Pps6: "PPS6",
  /** ARC_SCORE. */
  Ppsc: "PPSC",
  /** STATUS_DESCRIPTION. */
  Ppsd: "PPSD",
  /** AMEX_DENIED. */
  Ppse: "PPSE",
  /** VERIFICATION_TOKEN_EXPIRED. */
  Ppte: "PPTE",
  /** INVALID_TRACE_REFERENCE. */
  Pptf: "PPTF",
  /** INVALID_TRANSACTION_ID. */
  Ppti: "PPTI",
  /** VERIFICATION_TOKEN_REVOKED. */
  Pptr: "PPTR",
  /** TRANSACTION_TYPE_UNSUPPORTED. */
  Pptt: "PPTT",
  /** INVALID_VERIFICATION_TOKEN. */
  Pptv: "PPTV",
  /** USER_NOT_AUTHORIZED. */
  Ppua: "PPUA",
  /** CURRENCY_CODE_UNSUPPORTED. */
  Ppuc: "PPUC",
  /** UNSUPPORT_ENTITY. */
  Ppue: "PPUE",
  /** UNSUPPORT_INSTALLMENT. */
  Ppui: "PPUI",
  /** UNSUPPORT_POS_FLAG. */
  Ppup: "PPUP",
  /** UNSUPPORTED_REVERSAL. */
  Ppur: "PPUR",
  /** VALIDATE_CURRENCY. */
  Ppvc: "PPVC",
  /** VALIDATION_ERROR. */
  Ppve: "PPVE",
  /** VIRTUAL_TERMINAL_UNSUPPORTED. */
  Ppvt: "PPVT",
} as const;
export type ProcessorResponseCode =
  | (typeof ProcessorResponseCode)[keyof typeof ProcessorResponseCode]
  | (string & {});

export const processorResponseCodeSchema: EnumSchema<ProcessorResponseCode> =
  s.enumOf<ProcessorResponseCode>(ProcessorResponseCode);
