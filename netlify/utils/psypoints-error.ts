import ApiError from "./api-error"

export class ClaimedPointsNotFound extends ApiError {
  constructor() {
    super(404, "User has no claimedPoints record.")
  }
}

export class UnclaimedPointsNotFound extends ApiError {
  constructor() {
    super(404, "User has no unclaimedPoints record.")
  }
}
