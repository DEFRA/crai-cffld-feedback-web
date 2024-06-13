import { END } from '@langchain/langgraph'
import * as feedbackApi from '../nodes/feedback-api'

function router(state) {
  const { content } = state.messages[state.messages.length - 1]

  if (content === 'Unable') {
    console.log(
      '[ValidQueryRouter] LLM was unable to generate a valid GraphQL query.'
    )
    return END
  }

  return feedbackApi.NAME
}

export default router
