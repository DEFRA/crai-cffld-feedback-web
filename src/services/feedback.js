import Joi from 'joi'
import { subWeeks } from '~/node_modules/date-fns/subWeeks'
import { graphqlQuery } from '../server/common/helpers/feedback-api-client'

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

  return sorted
}

async function getAllFeedback(params) {
  const parsed = formatParams(params)

  const feedback = await getFeedback(parsed)

  return feedback
}

async function getFeedbackForLastWeek(params) {
  const feedback = await getAllFeedback({
    from_date: subWeeks(Date.now(), 1).toISOString(),
    to_date: new Date().toISOString(),
    ...params
  })

  return feedback
}

export { getAllFeedback, getFeedbackForLastWeek }
