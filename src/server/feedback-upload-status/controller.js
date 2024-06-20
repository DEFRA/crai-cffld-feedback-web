import { FeedbackUploadStatusModel } from '~/src/models/feedback-upload-status'
import { getMetadata } from '~/src/services/feedback'

const feedbackStatusController = {
  getStatusHandler: async (request, h) => {
    const feedback = await getMetadata()

    const model = new FeedbackUploadStatusModel(feedback)

    return h.view('feedback-upload-status/index', {
      pageTitle: 'Feedback Upload Status',
      heading: 'View Feedback Upload Status',
      model
    })
  }
}

export { feedbackStatusController }
