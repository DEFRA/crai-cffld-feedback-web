import { executeGraph } from "~/src/services/ai/trend-qa/index"
import { HumanMessage } from '@langchain/core/messages'

const qaController = {
  getHandler: async (request, h) => {
    return h.view('qa/index', {
      pageTitle: 'Q&A',
      heading: 'CFFLD Feedback Q&A'
    })
  },
  postHandler: async (request, h) => {
    const userPrompt = request.payload.userPrompt
    const { messages, query } = await executeGraph(userPrompt)

    let display = []

    messages.map((message) => {
      const keyName = message instanceof HumanMessage ? 'User:' : 'System:'
  
      display.push({
        key: {
          text: keyName
        },
        value: {
          html: message.content.replace(/\n/g, '<br>')
        }
      })
    })

    if (query.includes('Unable to construct a query')) {
      display.push({
        key: {
          text: 'System:'
        },
        value: {
          html: query
        }
      })
    }

    return h.view('qa/index', {
      pageTitle: 'Q&A',
      heading: 'CFFLD Feedback Q&A',
      display: display
    })
  }
}

export { qaController }
