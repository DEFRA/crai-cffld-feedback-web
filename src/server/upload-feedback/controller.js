import { ListBucketsCommand } from "@aws-sdk/client-s3"
import { buildS3Client } from "../common/helpers/s3-client"

/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
const feedbackUploadController = {
  getHandler: async (request, h) => {
    return h.view('upload-feedback/index')
  },
  postHandler: async (request, h) => {
    console.log('File received')
    return h.redirect('/')
  }
}

export { feedbackUploadController }
