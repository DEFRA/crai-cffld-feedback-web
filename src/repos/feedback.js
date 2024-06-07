import { PutObjectCommand } from '@aws-sdk/client-s3'
import { buildS3Client } from '~/src/server/common/helpers/s3-client'
import { createLogger } from '~/src/server/common/helpers/logging/logger'

const logger = createLogger()

async function uploadFeedback(file) {
  const command = new PutObjectCommand({
    Bucket: 'cffld-feedback-uploads',
    Key: `${new Date().toISOString()}.xlsx`,
    Body: file
  })

  const s3Client = buildS3Client()

  try {
    await s3Client.send(command)
  } catch (err) {
    logger.error(`Error uploading feedback file: ${err}`)
    throw err
  }
}

export { uploadFeedback }
