import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { useEffect, useState } from 'react'
import MapComponent from './MapComponent'
import { MapContext } from './MapContext'
import { useStations } from '../../apiCalls'
import LoadingSpinner from './LoadingSpinner'
import ErrorDialog from './ErrorDialog'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'

const MainMap = () => {
  const [map, setMap] = useState(null)
  const { isLoading, isError, error, data } = useStations()

  useEffect(() => {
    const jsonToLayer = (jsonData) => {
      let features = jsonData.map((station) => {
        return new Feature({
          geometry: new Point([station.latitude, station.longitude]).transform(
            'EPSG:4326',
            map.getView().getProjection()
          ),
          name: station.name,
          id: station.id,
        })
      })

      let source = new VectorSource({
        features,
      })

      let layer = new VectorLayer({
        source: source,
      })

      return layer
    }

    if (map && data) {
      let layer = jsonToLayer(data)

      map.addLayer(layer)
      map.getView().fit(layer.getSource().getExtent(), {
        padding: [100, 100, 100, 100],
        duration: 1000,
      })
    }
  }, [data, map])

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {isLoading && <LoadingSpinner message={'Loading map data...'} />}
      {isError && <ErrorDialog message={error.message} />}
      <MapComponent />
    </MapContext.Provider>
  )
}

export default MainMap
