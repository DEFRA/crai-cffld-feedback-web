import { END, START, StateGraph } from '@langchain/langgraph'
import { HumanMessage, AIMessage } from '@langchain/core/messages'

import * as contextQa from './nodes/context-qa'
import * as queryComposer from './nodes/query-composer'
import * as feedbackApi from './nodes/feedback-api'
import * as trendSummary from './nodes/trend-summary'
import validQueryRouter from './routers/valid-query'

function buildGraph(state) {
  const workflow = new StateGraph({
    channels: state
  })

  workflow
    .addNode(contextQa.NAME, contextQa.node)
    .addNode(queryComposer.NAME, queryComposer.node)
    .addNode(feedbackApi.NAME, feedbackApi.node)
    .addNode(trendSummary.NAME, trendSummary.node)
    .addNode('error', (state) => {
      if (state.query.includes('Unable to construct a query')) {
        return {
          messages: [new AIMessage(state.query)]
        }
      }

      return state
    })

  workflow
    .addEdge(START, contextQa.NAME)
    .addEdge(contextQa.NAME, queryComposer.NAME)
    .addConditionalEdges(queryComposer.NAME, validQueryRouter)
    .addEdge(feedbackApi.NAME, trendSummary.NAME)
    .addEdge('error', END)
    .addEdge(trendSummary.NAME, END)

  return workflow.compile()
}

async function executeGraph(message, history) {
  const state = {
    chat_history: [],
    messages: {
      value: (x, y) => (x || []).concat(y || []),
      default: () => []
    },
    current_date: '',
    query: '',
    feedback: '',
    input: ''
  }

  const graph = buildGraph(state)

  const response = await graph.invoke({
    chat_history: history.map(m => {
      if (m.id[2] === 'HumanMessage') {
        return new HumanMessage(m.kwargs.content)
      }

      return new AIMessage(m.kwargs.content, {
        query: m.kwargs.query
      })
    }),
    messages: [new HumanMessage(message)],
    current_date: new Date().toISOString()
  })
  
  return response
}

export { executeGraph }
