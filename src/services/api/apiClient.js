const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://6aa278d8ccb3db9689a68358.mockapi.io/api'

async function request(endpoint, options = {}) {
  const { includeMeta = false, ...fetchOptions } = options

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const errorData = await response.json()

      if (errorData?.message) {
        message = errorData.message
      }
    } catch {
      // Keep the default HTTP error message.
    }

    const error = new Error(message)
    error.status = response.status

    throw error
  }

  if (response.status === 204) {
    return null
  }

  const data = await response.json()

  if (includeMeta) {
    return {
      data,
      headers: response.headers,
    }
  }

  return data
}

export default request