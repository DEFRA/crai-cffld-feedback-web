import { BedrockChat } from '@langchain/community/chat_models/bedrock'

const haiku = new BedrockChat({
  model: 'anthropic.claude-3-haiku-20240307-v1:0',
  region: 'eu-central-1'
})

const sonnet = new BedrockChat({
  model: 'anthropic.claude-3-sonnet-20240229-v1:0',
  region: 'eu-central-1'
})

export {
  haiku,
  sonnet
}
