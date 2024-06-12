class Dashboard {
  constructor(urgent, feedback, allFeedback) {
    this.urgent = {
      weekly: urgent.length
    }

    this.feedback = {
      weekly: feedback.length,
      allTime: allFeedback.length
    }
  }
}

export { Dashboard }
