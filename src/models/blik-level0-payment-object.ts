import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type BlikLevel0PaymentObject = {
  authCode: string;
};

export const blikLevel0PaymentObjectSchema: Schema<BlikLevel0PaymentObject> =
  s.object<BlikLevel0PaymentObject>({
    authCode: s.string(),
    _keysMap: {
      authCode: "auth_code",
    },
  });
