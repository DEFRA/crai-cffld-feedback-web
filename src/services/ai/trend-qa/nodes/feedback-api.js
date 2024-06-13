import { graphqlQuery } from '~/src/server/common/helpers/feedback-api-client'

const NAME = 'feedback_api'

async function node(state) {
  const { feedback } = await graphqlQuery(state.query)

  return {
    feedback
  }
}

export { NAME, node }
