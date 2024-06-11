import { subWeeks } from "~/node_modules/date-fns/subWeeks"
import { graphqlQuery } from "../server/common/helpers/feedback-api-client"

let query = `{
    feedback {
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

async function getAllFeedback() {
  const { feedback } = await graphqlQuery(query)
  return feedback
}

async function getFeedbackForLastWeek() {
  const fromDate = subWeeks(Date.now(), 1).toISOString()
  const query = `{
    feedback(from_date: "${fromDate}") {
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

async function getUrgentFeedbackForLastWeek() {
  const fromDate = subWeeks(Date.now(), 1).toISOString()
  const query = `{
    feedback(from_date: "${fromDate}", urgent: true) {
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

export {
  getAllFeedback,
  getFeedbackForLastWeek,
  getUrgentFeedbackForLastWeek
}