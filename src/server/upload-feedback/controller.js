import { uploadFeedback } from '~/src/repos/feedback'

/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
const feedbackUploadController = {
  getHandler: async (request, h) => {
    return h.view('upload-feedback/index')
  },
  postHandler: async (request, h) => {
    const { feedbackUpload } = request.payload

    await uploadFeedback(feedbackUpload._data)

    return h.redirect('/')
  }
}

export { feedbackUploadController }
