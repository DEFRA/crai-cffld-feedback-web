const Wreck = require('@hapi/wreck')

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

  const { payload } = await Wreck.get(url, options)

  return payload
}

async function post(url, data, headers) {
  const options = {
    ...getOptions(headers),
    payload: data
  }

  const { payload } = await Wreck.post(url, options)

  return payload
}

async function put(url, data) {
  const options = {
    ...getOptions(),
    payload: data
  }

  const { payload } = await Wreck.put(url, options)

  return payload
}

async function del(url, json = true) {
  const options = {
    ...getOptions(),
    json
  }

  const { payload } = await Wreck.delete(url, options)

  return payload
}

export {
  get,
  post,
  put,
  del
}
