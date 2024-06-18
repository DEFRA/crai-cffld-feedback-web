import { subWeeks } from 'date-fns'

import { FeedbackListModel } from "~/src/models/feedback-list"
import { summariseFeedback } from '~/src/services/ai/summarise'
import { getAllFeedback } from "~/src/services/feedback"

const feedbackViewController = {
  getFeedbackHandler: async (request, h) => {
    const { query } = request

    const feedback = await getAllFeedback(query)

    if (!feedback.length) {
      return h.view('feedback/index', {
        pageTitle: 'Feedback',
        heading: 'View CFFLD Feedback'
      })
    }

    const summary = await summariseFeedback(feedback)

    const model = new FeedbackListModel(summary, feedback)

    return h.view('feedback/index', {
      pageTitle: 'Feedback',
      heading: 'View CFFLD Feedback',
      model
    })
  }
}

export { feedbackViewController }