import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import Select from 'ol/interaction/Select'
import { useCallback, useEffect, useRef } from 'react'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import { useAppContext } from '../../../context/ApplicationContext'
import { useMapContext } from '../MapContext'

const MapComponent = () => {
  const mapRef = useRef()
  const { map, setMap } = useMapContext()
  const { setSelectedStation } = useAppContext()

  const onStationSelectEvent = useCallback(
    (selected) => {
      if (selected.length > 0) {
        let station = selected[0].getProperties()
        let id = station['id']
        setSelectedStation(id)
      } else {
        setSelectedStation(null)
      }
    },
    [setSelectedStation]
  )

  useEffect(() => {
    let m = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    m.setTarget(mapRef.current)

    setMap(m)

    return () => m.setTarget(undefined)
  }, [setMap])

  useEffect(() => {
    const selected = new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.5)',
        }),
        stroke: new Stroke({
          color: 'rgba(255, 255, 0, 0.9)',
          width: 2,
        }),
      }),
    })

    if (map) {
      // INFO: select interaction working on "singleclick"
      const selectSingleClick = new Select({ style: selected })
      selectSingleClick.on('select', (s) => onStationSelectEvent(s.selected))
      map.addInteraction(selectSingleClick)
    }
  }, [map, onStationSelectEvent])

  return (
    <div
      ref={mapRef}
      id="map"
      className="map"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    />
  )
}

export default MapComponent
