import Joi from 'joi'
import { subWeeks, format } from 'date-fns'
import { getFeedbackMetadata, graphqlQuery } from '~/src/server/common/helpers/feedback-api-client'

const dateFormat = 'dd MMMM yyyy hh:mm a'

const paramsSchema = Joi.object({
  from_date: Joi.string(),
  to_date: Joi.string(),
  urgent: Joi.boolean(),
  category: Joi.string(),
  sub_category: Joi.string(),
  search: Joi.string()
})

function formatParams(params) {
  const parsed = {}

  const keys = ['from_date', 'to_date', 'category', 'sub_category', 'search']

  for (const key of keys) {
    if (params?.[key]) {
      parsed[key] = `"${params[key]}"`
    }
  }

  if (params?.urgent) {
    parsed.urgent = params.urgent
  }

  return parsed
}

function formatFeedback(feedback) {
  return {
    qualtricsId: feedback.qualtrics_id,
    dateTime: format(new Date(feedback.date_time), dateFormat),
    comments: feedback.comments,
    llmComments: feedback.llm_comments,
    category: feedback.category,
    subCategory: feedback.sub_category,
    keyPoints: feedback.key_points,
    urgent: feedback.urgent
  }
}

function formatMetadata(metadata) {
  return {
    ...metadata,
    dateTime: format(new Date(metadata.id), dateFormat)
  }
}

async function getFeedback(params = {}) {
  const { error } = paramsSchema.validate(params, {
    abortEarly: false
  })

  if (error) {
    throw new Error(`Invalid GraphQL query parameters: ${error.message}`)
  }

  const args = Object.entries(params)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')

  const queryArgs = args ? `(${args})` : ''

  const query = `{
    feedback${queryArgs} {
      qualtrics_id,
      date_time,
      comments,
      llm_comments,
      category,
      sub_category,
      key_points,
      urgent
    }
  }`

  const { feedback } = await graphqlQuery(query)

  const sorted = feedback.sort(
    (a, b) => new Date(b.date_time) - new Date(a.date_time)
  )

  const mapped = sorted.map(formatFeedback)

  return mapped
}

async function getAllFeedback(params) {
  const parsed = formatParams(params)

  const feedback = await getFeedback(parsed)

  return feedback
}

async function getMetadata() {
  const metadata = await getFeedbackMetadata()

  return metadata.map(formatMetadata)
}

async function getFeedbackForLastWeek(params) {
  const feedback = await getAllFeedback({
    from_date: subWeeks(Date.now(), 1).toISOString(),
    to_date: new Date().toISOString(),
    ...params
  })

  return feedback
}

export {
  getAllFeedback,
  getMetadata,
  getFeedbackForLastWeek,
  formatFeedback
}
