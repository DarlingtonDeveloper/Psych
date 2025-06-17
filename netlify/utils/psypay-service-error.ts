import ApiError from "./api-error"

export class PsyPayUserNotFound extends ApiError {
  constructor() {
    super(404, "User was not found")
  }
}

export class VendorNotAuthenticated extends ApiError {
  constructor() {
    super(403, "Vendor is forbidden to access this request.")
  }
}

export class PsyPayUserWalletAddressAlreadyExists extends ApiError {
  constructor() {
    super(
      411,
      "Attempt to create psypay user failed. User with supplied wallet address already exists."
    )
  }
}

export class InsufficientClaimedPsy extends ApiError {
  constructor() {
    super(
      406,
      "Required number of claimed psy points to perform action was not met."
    )
  }
}
