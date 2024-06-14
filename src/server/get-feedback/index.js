import { feedbackViewController } from '~/src/server/get-feedback/controller'

const getFeedback = {
  plugin: {
    name: 'getFeedback',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/get-feedback/urgent',
          handler: feedbackViewController.getUrgentHandler
        },
        {
          method: 'GET',
          path: '/get-feedback/week',
          handler: feedbackViewController.getWeekHandler
        },
        {
          method: 'GET',
          path: '/get-feedback/all',
          handler: feedbackViewController.getAllHandler
        }
      ])
    }
  }
}

export { getFeedback }