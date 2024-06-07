import { PutObjectCommand } from '@aws-sdk/client-s3'
import { buildS3Client } from '../server/common/helpers/s3-client'

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
    throw err
  }
}

export { uploadFeedback }
