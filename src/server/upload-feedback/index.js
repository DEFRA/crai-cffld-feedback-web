import { feedbackUploadController } from '~/src/server/upload-feedback/controller'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */
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
          handler: feedbackUploadController.postHandler
        }
      ])
    }
  }
}

export { feedbackUpload }
