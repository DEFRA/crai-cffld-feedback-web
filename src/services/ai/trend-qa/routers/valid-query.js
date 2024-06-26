import { END } from '@langchain/langgraph'
import * as feedbackApi from '../nodes/feedback-api'

function router(state) {
  if (state.query.includes('Unable to construct a query')) {
    console.log(
      '[ValidQueryRouter] LLM was unable to generate a valid GraphQL query.'
    )

    return END
  }

  return feedbackApi.NAME
}

export default router
