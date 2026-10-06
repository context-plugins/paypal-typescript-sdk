import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Information used to pay using BLIK level_0 flow. */
export type BlikLevel0PaymentObject = {
  /** The 6-digit code used to authenticate a consumer within BLIK. */
  authCode: string;
};

export const blikLevel0PaymentObjectSchema: Schema<BlikLevel0PaymentObject> =
  s.object<BlikLevel0PaymentObject>({
    authCode: s.string(),
    _keysMap: {
      authCode: "auth_code",
    },
  });
