const Wreck = require('@hapi/wreck')

import { createLogger } from '~/src/server/common/helpers/logging/logger'

const logger = createLogger()

function getOptions(headers) {
  return {
    headers: {
      ...headers
    },
    json: true
  }
}

async function get(url, json = true) {
  const options = {
    ...getOptions(),
    json
  }

  try {
    const { payload } = await Wreck.get(url, options)

    return payload
  } catch (err) {
    logger.error(`Error while trying to GET ${url}: ${err}`)
    throw new Error(err)
  }
}

async function post(url, data, headers) {
  const options = {
    ...getOptions(headers),
    payload: data
  }

  try {
    const { payload } = await Wreck.post(url, options)

    return payload
  } catch (err) {
    logger.error(`Error while trying to POST ${url}: ${err}`)
    throw new Error(err)
  }
}

async function put(url, data) {
  const options = {
    ...getOptions(),
    payload: data
  }

  try {
  const { payload } = await Wreck.put(url, options)

    return payload
  } catch (err) {
    logger.error(`Error while trying to PUT ${url}: ${err}`)
    throw new Error(err)
  }
}

async function del(url, json = true) {
  const options = {
    ...getOptions(),
    json
  }

  try {
    const { payload } = await Wreck.delete(url, options)

    return payload
  } catch (err) {
    logger.error(`Error while trying to DELETE ${url}: ${err}`)
    throw new Error(err)
  }
}

export { get, post, put, del }
