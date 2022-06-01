import { useQuery } from 'react-query'
import config from '../config'

const API_URL = config.STATION_API_URL

export const useStations = () => {
  return useQuery(
    'stations',
    async () => {
      const data = await fetch(`${API_URL}/station`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data.json()
    },
    {
      retry: false,
    }
  )
}

export const useStationId = (id) => {
  return useQuery(
    'stationId',
    async () => {
      const data = await fetch(`${API_URL}/station?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data.json()
    },
    {
      retry: false,
    }
  )
}

export const useMeteoVariables = () => {
  return useQuery(
    'meteoVariables',
    async () => {
      const data = await fetch(`${API_URL}/meteo-variable`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data.json()
    },
    {
      retry: 1,
    }
  )
}
