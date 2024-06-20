import { config } from '~/src/config'
import { get, post } from './api-base'

const { baseUrl } = config.get('feedbackApi')

async function graphqlQuery(payload) {
  const url = `${baseUrl}/query`

  return post(url, payload)
}

async function getFeedbackMetadata() {
  const url = `${baseUrl}/metadata`

  return get(url)
}

export { graphqlQuery, getFeedbackMetadata }
