import { describe, expect, it } from "vitest"
import { mapResCode } from "../../../utils/mapResCode"

describe("register response codes", () => {
  it.each([
    ["USER_NOT_VERIFY", "auth.error.register.user_not_verified"],
    ["USER_ALREADY_EXISTS", "auth.error.register.user_already_exists"],
    ["VALIDATION_FAILED", "auth.error.register.validation_failed"],
  ])("maps %s to its translation key", (code, translationKey) => {
    expect(mapResCode[code]).toBe(translationKey)
  })
})
