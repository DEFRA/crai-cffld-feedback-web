import { queryController } from '~/src/server/query/controller'

const query = {
  plugin: {
    name: 'query',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/qa/query/{messageNo}',
          handler: queryController.getHandler
        }
      ])
    }
  }
}

export { query }
