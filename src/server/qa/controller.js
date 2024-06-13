import { executeGraph } from "~/src/services/ai/trend-qa/index"

const qaController = {
  getHandler: async (request, h) => {
    return h.view('qa/index', {
      pageTitle: 'Q&A',
      heading: 'CFFLD Feedback Q&A'
    })
  },
  postHandler: async (request, h) => {
    const userPrompt = request.payload.userPrompt
    const response = await executeGraph(userPrompt)
    console.log('Response: ', response)

    return h.view('qa/index', {
      pageTitle: 'Q&A',
      heading: 'CFFLD Feedback Q&A',
      //response
    })
  }
}

export { qaController }
