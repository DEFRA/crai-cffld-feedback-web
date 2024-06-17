import { END, START, StateGraph } from '@langchain/langgraph'
import { HumanMessage, AIMessage } from '@langchain/core/messages'

import * as queryComposer from './nodes/query-composer'
import * as feedbackApi from './nodes/feedback-api'
import * as trendSummary from './nodes/trend-summary'
import validQueryRouter from './routers/valid-query'

function buildGraph(state) {
  const workflow = new StateGraph({
    channels: state
  })

  workflow
    .addNode(queryComposer.NAME, queryComposer.node)
    .addNode(feedbackApi.NAME, feedbackApi.node)
    .addNode(trendSummary.NAME, trendSummary.node)

  workflow
    .addEdge(START, queryComposer.NAME)
    .addConditionalEdges(queryComposer.NAME, validQueryRouter)
    .addEdge(feedbackApi.NAME, trendSummary.NAME)
    .addEdge(trendSummary.NAME, END)

  return workflow.compile()
}

async function executeGraph(message, prevMessages) {
  const state = {
    chat_history: {

    },
    messages: {
      value: (x, y) => (x || []).concat(y || []),
      default: () => []
    },
    current_date: '',
    query: '',
    feedback: ''
  }

  const graph = buildGraph(state)

  const response = await graph.invoke({
    chat_history: prevMessages.map(m => {
      if (m.id[2] === 'HumanMessage') {
        return new HumanMessage(m.kwargs.content)
      }

      return new AIMessage(m.kwargs.content, {
        query: m.kwargs.additional_kwargs.query,
      })
    }),
    messages: [new HumanMessage(message)],
    current_date: new Date().toISOString()
  })
  
  return response
}

export { executeGraph }
