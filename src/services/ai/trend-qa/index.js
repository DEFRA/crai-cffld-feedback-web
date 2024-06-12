import { graphqlQuery } from "~/src/server/common/helpers/feedback-api-client"
import { buildQAChain } from "~/src/services/ai/trend-qa/chains/query-composer"

async function executeQa(message) {
  const chain = buildQAChain()

  const query = await chain.invoke({
    input: message
  })

  console.log(`Executing graphQl query: ${query}`)
  const { feedback } = await graphqlQuery(query)
  console.log(feedback)
  return feedback
}

export { executeQa }
