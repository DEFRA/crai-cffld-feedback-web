import inert from '@hapi/inert'

import { health } from '~/src/server/health'
import { home } from '~/src/server/home'
import { feedbackUpload } from '~/src/server/upload-feedback'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'
import { qa } from '~/src/server/qa'

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([home, qa, feedbackUpload])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

export { router }
