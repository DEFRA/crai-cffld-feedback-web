const feedbackViewController = {
  getUrgentHandler: async (request, h) => {
    return h.view('get-feedback/index', {
      pageTitle: 'Feedback',
      heading: 'CFFLD Feedback Dashboard: Urgent'
    })
  },
  getWeekHandler: async (request, h) => {
    return h.view('get-feedback/index', {
      pageTitle: 'Feedback',
      heading: 'CFFLD Feedback Dashboard: Last Week'
    })
  },
  getAllHandler: async (request, h) => {
    return h.view('get-feedback/index', {
      pageTitle: 'Feedback',
      heading: 'CFFLD Feedback Dashboard: Total Feedback'
    })
  }
}

export { feedbackViewController }