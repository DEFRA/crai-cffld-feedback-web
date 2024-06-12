import { config } from '~/src/config'
import { post } from './api-base'
import { createLogger } from './logging/logger'

const logger = createLogger()

const { baseUrl } = config.get('feedbackApi')

async function graphqlQuery(payload) {
  const url = `${baseUrl}/query`

  try {
    return post(url, payload)
  } catch (err) {
    logger.error(err)
    throw err
  }
}

export { graphqlQuery }
