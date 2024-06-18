import { format } from "date-fns/format"

const dateFormat = 'dd MMMM yyyy hh:mm a'

class FeedbackListModel {
  constructor(summary, feedback) {
    this.summary = summary.split(/\n/g)

    this.feedback = feedback.map((f) => {
      const { qualtrics_id, date_time, comments, llm_comments, category, sub_category, key_points, urgent } = f

      return {
        qualtrics_id,
        date_time: format(new Date(date_time), dateFormat),
        comments,
        llm_comments,
        category,
        sub_category,
        key_points,
        urgent
      }
    })
  }
}

export { FeedbackListModel }
