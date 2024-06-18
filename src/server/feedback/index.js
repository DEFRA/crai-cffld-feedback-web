import { feedbackViewController } from '~/src/server/feedback/controller'

const feedback = {
  plugin: {
    name: 'feedback',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/feedback',
          handler: feedbackViewController.getFeedbackHandler
        }
      ])
    }
  }
}

export { feedback }
