import { config } from '~/src/config'
import { get, post } from './api-base'

const { baseUrl } = config.get('feedbackApi')

async function graphqlQuery(payload) {
  const url = `${baseUrl}/feedback/query`

  return post(url, payload)
}

async function getFeedbackMetadata() {
  const url = `${baseUrl}/feedback/metadata`

  return get(url)
}

async function uploadFeedbackFile(file) {
  const url = `${baseUrl}/feedback/upload`

  const headers = {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }

  return post(url, file, headers)
}

export { graphqlQuery, getFeedbackMetadata, uploadFeedbackFile }
