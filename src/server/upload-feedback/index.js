import { feedbackUploadController } from '~/src/server/upload-feedback/controller'

const feedbackUpload = {
  plugin: {
    name: 'feedbackUpload',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/upload-feedback',
          handler: feedbackUploadController.getHandler
        },
        {
          method: 'POST',
          path: '/upload-feedback',
          handler: feedbackUploadController.postHandler,
          options: {
            payload: {
              maxBytes: 50 * 1024 * 1024 + 250,
              multipart: true,
              timeout: false,
              output: 'stream',
              parse: true,
              allow: 'multipart/form-data'
            }
          }
        }
      ])
    }
  }
}

export { feedbackUpload }
