import { Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import ChartComponent from './ChartComponent'
import ChartControls from './ChartControls'
import { ChartContextProvider } from './ChartContext'

const ChartController = ({ labelMap = {}, unitMap = {}, chartData = [] }) => {
  const [datasets, setDatasets] = useState({})
  const [labels, setLabels] = useState([])
  const [variables, setVariables] = useState({})
  const dataTimeStampField = 'ts'

  useEffect(() => {
    let xAxisLabels = chartData.map((entry) => entry[dataTimeStampField])
    let [first] = chartData
    // INFO: remove cod_station and timestamp
    let variables = {}
    Object.keys(first)
      .slice(2)
      .forEach((code) => {
        variables[code] = labelMap[code]
      })
    let xAxisDatasets = {}

    Object.keys(variables).forEach((k) => {
      xAxisDatasets[k] = []
    })
    Object.keys(xAxisDatasets).forEach((k) => {
      xAxisDatasets[k] = chartData.map((entry) => entry[k])
    })

    setVariables(variables)
    setLabels(xAxisLabels)
    setDatasets(xAxisDatasets)
  }, [chartData, labelMap])

  return (
    <ChartContextProvider>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          alignContent: 'center',
          gap: '25px',
        }}
      >
        <ChartControls variables={variables} />
        <Paper sx={{}}>
          <ChartComponent
            labelMap={labelMap}
            unitMap={unitMap}
            labels={labels}
            datasets={datasets}
          />
        </Paper>
      </Box>
    </ChartContextProvider>
  )
}

export default ChartController
