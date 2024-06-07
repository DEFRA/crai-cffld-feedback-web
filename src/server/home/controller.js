import { ListBucketsCommand } from "@aws-sdk/client-s3"
import { buildS3Client } from "../common/helpers/s3-client"

/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
const homeController = {
  handler: async (request, h) => {
    const s3 = buildS3Client()

    const buckets = await s3.send(new ListBucketsCommand({}))

    console.log(buckets)

    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  }
}

export { homeController }
