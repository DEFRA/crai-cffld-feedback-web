import { executeGraph } from "~/src/services/ai/trend-qa/index"
import { QaModel } from '~/src/models/qa'

const qaController = {
  getHandler: async (request, h) => {
    const messages = request.yar.get('qa-messages') ?? []

    const qa = new QaModel(messages)

    return h.view('qa/index', {
      pageTitle: 'Q&A',
      heading: 'CFFLD Feedback Q&A',
      qa
    })
  },
  postHandler: async (request, h) => {
    const userPrompt = request.payload.userPrompt

    const prevMessages = request.yar.get('qa-messages') ?? []

    const { messages } = await executeGraph(userPrompt, prevMessages)

    request.yar.set('qa-messages', [...prevMessages, ...messages])

    return h.redirect('/qa')
  }
}

export { qaController }
