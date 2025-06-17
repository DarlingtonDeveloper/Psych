import ApiError from "./api-error"

export class UserNotFound extends ApiError {
  constructor() {
    super(404, "User was not found")
  }
}

export class UserInvalidSignature extends ApiError {
  constructor() {
    super(401, "User's signature was rejected.")
  }
}

export class UserNotAuthenticated extends ApiError {
  constructor() {
    super(403, "User is forbidden to access this request.")
  }
}

export class UserPermissionsRejected extends ApiError {
  constructor() {
    super(403, "User doesn't have enough permissions to access this request.")
  }
}

export class UserPsypointsBulkUpdateFailed extends ApiError {
  constructor() {
    super(
      500,
      "Bulk update of pa_users collection for daily giving of psypoints failed."
    )
  }
}

export class UserSessionUnmatchedParams extends ApiError {
  constructor() {
    super(
      403,
      "User doesn't have permission to process for given wallet address."
    )
  }
}
