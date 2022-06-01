import { createContext, useContext } from 'react'

export const MapContext = createContext(null)

export const useMapContext = () => useContext(MapContext)
