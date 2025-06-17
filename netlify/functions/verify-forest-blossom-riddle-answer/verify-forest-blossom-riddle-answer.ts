import { Handler } from "@netlify/functions"
import { getRiddle } from "../../utils/get-riddle"
import Joi from "joi"
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"
import {
  getUser,
  updateUserProgress,
  updateUserAttempt,
} from "../../utils/get-user"
import { UserInvalidSignature, UserNotFound } from "../../utils/users-error"

const rateLimit = 3
const rateLimitTime = 600000

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const checkRiddleEndpointSchema = Joi.object({
  riddleID: Joi.number().integer().min(0).required(),
})

const checkRiddleEndpointBodySchema = Joi.object({
  userAnswer: Joi.string().allow("").required(),
})

export const handler: Handler = async (event) => {
  const start = Date.now() // ms

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const params = event.queryStringParameters
  const validationResults = checkRiddleEndpointSchema.validate(params)
  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationResults.error,
      }),
    }
  }

  const body = JSON.parse(event.body)
  const bodyValidationResults = checkRiddleEndpointBodySchema.validate(body)

  if (bodyValidationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: bodyValidationResults.error,
      }),
    }
  }

  const auth = event.headers.authorization
  if (auth) {
    const token = auth.replace("Bearer ", "")

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      const walletAddress = decoded.walletAddress

      const riddleID = parseInt(event.queryStringParameters!.riddleID)
      const userAnswer = body?.userAnswer

      try {
        const ret = await getUser(walletAddress)

        if (!ret.length) {
          throw new UserNotFound()
        } else {
          const existingUser = ret[0]

          let attemptCount = 0
          if ("attempts" in existingUser) {
            attemptCount = existingUser.attempts
          }
          if (attemptCount > rateLimit - 1) {
            const timeAllowed = existingUser.updatedAt + rateLimitTime

            if (start < timeAllowed) {
              return {
                statusCode: 429,
                headers,
                body: JSON.stringify({
                  message: "Too many attempts. Try again in a later time.",
                }),
              }
            } else {
              // reset attempts, every rateLimitTime User gets rateLimit attempts
              attemptCount = 0
            }
          }

          // reject client attempts to check riddleID not == current progress
          if (riddleID !== existingUser.progress) {
            await updateUserAttempt(walletAddress, attemptCount + 1)
            return {
              statusCode: 403,
              headers,
              body: JSON.stringify({
                message: "Not allowed.",
              }),
            }
          }

          const retGetRiddle = await getRiddle(riddleID)
          const retRiddle = retGetRiddle[0]
          const answer = retRiddle.answer
          const isCorrect = answer.toLowerCase() === userAnswer.toLowerCase()
          if (isCorrect) {
            const progress = existingUser.progress + 1
            await updateUserProgress(walletAddress, progress)
            return {
              statusCode: 200,
              headers,
            }
          } else {
            await updateUserAttempt(walletAddress, attemptCount + 1)
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                message: "Wrong answer.",
              }),
            }
          }
        }
      } catch (error) {
        if (
          error instanceof UserInvalidSignature ||
          error instanceof UserNotFound
        ) {
          return {
            statusCode: error.statusCode,
            headers,
            body: JSON.stringify({
              message: error.message,
            }),
          }
        } else {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              message: "Something went wrong. Please try again.",
            }),
          }
        }
      }
    } catch (authErr) {
      if (authErr instanceof TokenExpiredError) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            message: "Token expired",
          }),
        }
      } else if (authErr instanceof JsonWebTokenError) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            message: "Not authorized access.",
          }),
        }
      } else {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            message: "Something went wrong. Please try again.",
          }),
        }
      }
    }
  } else {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        message: "Authorization header required.",
      }),
    }
  }
}
