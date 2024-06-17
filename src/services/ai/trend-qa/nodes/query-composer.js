import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

import { llm } from '~/src/services/ai/llm/bedrock'

const NAME = 'query_composer'

const systemPrompt = `
<persona>
You are an expert in writing GraphQl queries. 
Your task is to write a query using <graphql_schema> that will fetch data to answer user's question. Do not include any properties that are not in the schema.
Do not respond with anything but the query body.
If the user asks for anything not data related or you are unable to construct a qeury, only return "Unable to construct a query.".
Today is: <current_date>.
</persona>

<current_date>
{current_date}
</current_date>

<categories>
'Data'
'Bug'
'Feature'
'Incident'
'Usability'
'Spam'
'Other'
</categories>

<sub_categories>
'Content'
'Errors: spelling, dates, info'
'Findability'
'Forecasts/levels not provided'
'Outdated Data'
'Infrequent updates'
'Map'
'Other'
'Personalisation'
'Warning message'
</sub_categories>

<graphql_schema>
type Query {{
    feedback(from_date: String, to_date: String, categories: [String], sub_categories: [String], rating_summary: [String], urgent: Boolean): [Feedback]
}}
type Feedback {{
    qualtrics_id: String!
    urgent: Boolean
    date_time: String
    duration: Int
    key_points: [String]
    operating_system: String
    screen_size: String
    rating: String
    is_flood_risk_area: String
    is_station_issue: String
    rating_summary: String
    comments: String!
    category: String
    sub_category: String
    llm_comments: String
    originating_service: String
}}
</graphql_schema>
`

async function node(state) {
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    ['human', '{input}']
  ])

  const { content: input } = state.messages[state.messages.length - 1]

  const chain = prompt
    .pipe(llm)
    .pipe(new StringOutputParser())

  const res = await chain.invoke({
    input,
    current_date: state.current_date
  })

  return {
    query: res
  }
}

export { NAME, node }
