import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

import { sonnet } from '~/src/services/ai/llm/bedrock'

const NAME = 'context_qa'

const systemPrompt = `
<instruction>
Given a chat history (<chat_history>) and the latest user question, formulate a standalone question that can be understood without the context of the chat history.

Do not:
- Ask for clarification
- Ask for more information
- Ask for a confirmation
- Answer the user's question
- Provide a solution
- Add additional filters to the question if the user has not provided any

Do:
- Formulate a standalone question that can be understood without the context of the chat history
- Return only the question as your response
- If you are unable to formulate a question, return the user's question as is without any changes
- Ensure filters are included in the question if the user has provided them unless the user has asked a new question with different filters
</instruction>

<chat_history>
{chat_history}
</chat_history>
`

async function node(state) {
  const { content: input } = state.messages[state.messages.length - 1]

  if (state.chat_history.length === 0) {
    return {
      input
    }
  }

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    ['human', '{input}']
  ])

  const chain = prompt
    .pipe(sonnet)
    .pipe(new StringOutputParser())

  const res = await chain.invoke({
    chat_history: JSON.stringify(state.chat_history),
    input
  })

  console.log('context_qa ', res)

  return {
    input: res
  }
}

export { NAME, node }
