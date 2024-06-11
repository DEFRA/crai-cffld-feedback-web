import { getAllFeedback, getFeedbackForLastWeek, getUrgentFeedbackForLastWeek } from "~/src/services/feedback"
import { Dashboard } from "~/src/models/dashboard"


/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
const homeController = {
  handler: async (request, h) => {
    const urgentFeedback = await getUrgentFeedbackForLastWeek()
    const feedback = await getFeedbackForLastWeek()
    const allFeedback = await getAllFeedback()

    const dashboard = new Dashboard(urgentFeedback, feedback, allFeedback)

    return h.view('home/index', {
      pageTitle: 'Dashboard',
      heading: 'CFFLD Feedback Analysis',
      dashboard
    })
  }
}

export { homeController }
