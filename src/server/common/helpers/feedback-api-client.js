import { post } from "./api-base"
import { createLogger } from "./logging/logger"

const logger = createLogger()

const baseUrl = 'http://localhost:3000/feedback'

async function graphqlQuery(payload) {
  const url = `${baseUrl}/query`

  try {
    return post(url, payload)
  } catch (err) {
    logger.error(err)
    throw err
  }
}

export {graphqlQuery}