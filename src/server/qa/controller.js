const qaController = {
  getHandler: async (request, h) => {
    return h.view('qa/index')
  },
  postHandler: async (request, h) => {
    const { userPrompt } = request.payload

    await uploadFeedback(feedbackUpload._data)

    return h.redirect('/')
  }
}

export { qaController }
