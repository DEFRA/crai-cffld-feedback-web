import { qaController } from '~/src/server/qa/controller'
import Joi from 'joi'

const qa = {
  plugin: {
    name: 'qa',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/qa',
          handler: qaController.getHandler
        },
        {
          method: 'POST',
          path: '/qa',
          handler: qaController.postHandler          
        }
      ])
    }
  }
}

export { qa }
