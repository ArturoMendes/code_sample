import { useQuery } from 'react-query'
import config from '../config'

const API_URL = config.METEO_API_URL

export const useMeteoData = () => {
  return useQuery(
    'meteoData',
    async () => {
      const data = await fetch(`${API_URL}/meteo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'aaplication/json',
        },
      })

      return data.json()
    },
    {
      retry: false,
    }
  )
}
