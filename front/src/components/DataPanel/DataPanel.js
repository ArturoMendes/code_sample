import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMeteoData, useMeteoVariables } from '../../apiCalls'
import { useAppContext } from '../../context/ApplicationContext'
import SwipePanel from './SwipePanel'
import ChartController from './ChartController'
import TableController from './TableController'

const TabWrapper = (props) => {
  return (
    <Box
      p={2}
      sx={{
        height: '100%',
        overflow: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {props.children}
    </Box>
  )
}

const DataPanel = () => {
  const { selectedStation } = useAppContext()
  const { data: meteoVariables } = useMeteoVariables()
  const { data: stationData } = useMeteoData()
  const [swipePanelTitle, setSwipePanelTitle] = useState(null)

  const [selectedStationData, setSelectedStationData] = useState([])
  // INFO: dictionary to map from human-readable variable names to codes
  const [variableLabelMap, setVariableLabelMap] = useState({})
  const [variableUnitMap, setVariableUnitMap] = useState({})

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (selectedStation) {
      let title = `Station ${selectedStation} data`
      setSwipePanelTitle(title)
    } else {
      setSwipePanelTitle(null)
    }
  }, [selectedStation])

  useEffect(() => {
    if (meteoVariables && stationData) {
      let labelsDict = {
        ts: 'Timestamp',
      }
      let unitsDict = {}

      let [first] = stationData
      if (first) {
        let variables = Object.keys(first).slice(2)
        meteoVariables.forEach((entry, idx) => {
          let variableCode = variables[idx]
          labelsDict[variableCode] = `${entry.name}`
          unitsDict[variableCode] = entry.unit
        })

        setVariableLabelMap(labelsDict)
        setVariableUnitMap(unitsDict)
      }
    }
  }, [meteoVariables, stationData])

  useEffect(() => {
    if (selectedStation && stationData) {
      let filteredByStation = stationData.filter(
        (d) => d.cod_station === selectedStation
      )
      setSelectedStationData(filteredByStation)
    }
  }, [selectedStation, stationData])

  const handleTabChange = (event, idx) => {
    setActiveTab(idx)
  }

  return (
    <SwipePanel title={swipePanelTitle}>
      {selectedStation ? (
        <>
          <Box
            pb={2}
            className="data-panel-controls"
            sx={{
              width: '100%',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Table" id={'tab-0'} />
              <Tab label="Chart" id={'tab-1'} />
            </Tabs>
          </Box>
          {activeTab === 0 ? (
            <TableController
              labelMap={variableLabelMap}
              unitMap={variableUnitMap}
              tableData={selectedStationData}
            />
          ) : (
            <TabWrapper>
              <ChartController
                labelMap={variableLabelMap}
                unitMap={variableUnitMap}
                chartData={selectedStationData}
              />
            </TabWrapper>
          )}
        </>
      ) : (
        <Box p={1}>
          <Typography variant="body1">Select a station to view data</Typography>
        </Box>
      )}
    </SwipePanel>
  )
}

export default DataPanel
