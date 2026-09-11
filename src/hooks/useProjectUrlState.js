import { useSearchParams } from 'react-router-dom'

const DEFAULT_VALUES = {
  search: '',
  status: '',
  category: '',
  priority: '',
  assignee: '',
  sort: '',
  page: '1',
}

const URL_KEYS = Object.keys(DEFAULT_VALUES)

function useProjectUrlState() {
  const [searchParams, setSearchParams] = useSearchParams()

  const state = URL_KEYS.reduce((values, key) => {
    values[key] = searchParams.get(key) ?? DEFAULT_VALUES[key]
    return values
  }, {})

  function updateUrl(updates, options = {}) {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (!URL_KEYS.includes(key)) {
        return
      }

      const normalizedValue = String(value ?? '').trim()

      if (
        normalizedValue === '' ||
        (key === 'page' && normalizedValue === '1')
      ) {
        nextParams.delete(key)
        return
      }

      nextParams.set(key, normalizedValue)
    })

    setSearchParams(nextParams, {
      replace: options.replace ?? true,
    })
  }

  function clearUrlState() {
    setSearchParams({}, {
      replace: true,
    })
  }

  return {
    ...state,
    updateUrl,
    clearUrlState,
  }
}

export default useProjectUrlState