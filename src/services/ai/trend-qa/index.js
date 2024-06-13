import { END, START, StateGraph } from '@langchain/langgraph'
import { HumanMessage } from '@langchain/core/messages'

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
    .addEdge(feedbackApi.NAME, trendSummary.NAME)
    .addEdge(trendSummary.NAME, END)
    .addConditionalEdges(queryComposer.NAME, validQueryRouter)

  return workflow.compile()
}

async function executeGraph(message) {
  const state = {
    messages: {
      value: (x, y) => (x || []).concat(y || []),
      default: () => []
    },
    current_date: '',
    query: '',
    feedback: ''
  }

  const graph = buildGraph(state)

  const res = await graph.invoke({
    messages: [new HumanMessage(message)],
    current_date: new Date().toISOString()
  })

  const display = res.messages.map((m) => {
    const prefix = m instanceof HumanMessage ? 'Human:' : 'System:'

    return `${prefix} ${m.content}`
  })

  console.log('Display: ', display.join('\n\n'))

  return res
}

export { executeGraph }
