import ApiError from "./api-error"

export class PriceNotFound extends ApiError {
  constructor() {
    super(404, "Price not found.")
  }
}
