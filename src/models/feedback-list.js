import { format } from 'date-fns/format'

const dateFormat = 'dd MMMM yyyy hh:mm a'

class FeedbackListModel {
  constructor(summary, feedback) {
    this.summary = summary.split(/\n/g)

    this.feedback = feedback.map((f) => {
      const {
        qualtrics_id: qualtricsId,
        date_time: dateTime,
        comments,
        llm_comments: llmComments,
        category,
        sub_category: subCategory,
        key_points: keyPoints,
        urgent
      } = f

      return {
        qualtricsId,
        dateTime: format(new Date(dateTime), dateFormat),
        comments,
        llmComments,
        category,
        subCategory,
        keyPoints,
        urgent
      }
    })
  }
}

export { FeedbackListModel }
