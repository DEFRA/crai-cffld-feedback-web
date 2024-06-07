import { S3Client } from '@aws-sdk/client-s3'

let client

function buildS3Client() {
  if (client) {
    return client
  }

  client = new S3Client({
    region: 'eu-central-1'
  })
    
  return client
}

export { buildS3Client }
