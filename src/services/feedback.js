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

async function getFeedback(params = {}) {
  const { error } = paramsSchema.validate(params)

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

  return feedback
}

async function getAllFeedback(params) {
  const feedback = await getFeedback(params)

  return feedback
}

async function getFeedbackForLastWeek() {
  const params = {
    from_date: `"${subWeeks(Date.now(), 1).toISOString()}"`,
  }

  return getFeedback(params)
}

async function getUrgentFeedbackForLastWeek() {
  const params = {
    from_date: `"${subWeeks(Date.now(), 1).toISOString()}"`,
    urgent: true
  }
  
  return getFeedback(params)
}

export {
  getAllFeedback,
  getFeedbackForLastWeek,
  getUrgentFeedbackForLastWeek
}