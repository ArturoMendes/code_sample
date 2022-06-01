import { Box, Typography } from '@mui/material'
import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useChartContext } from '../ChartContext'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const ChartComponent = ({
  labelMap = {},
  unitMap = {},
  labels = [],
  datasets = [],
}) => {
  const isVertical = window.innerWidth < window.innerHeight
  const { startDate, endDate, selectedVariable } = useChartContext()
  const [labelRange, setLabelRange] = useState(labels)
  const [yAxisValues, setYAxisValues] = useState([])

  useEffect(() => {
    if (Object.keys(datasets).includes(selectedVariable)) {
      setYAxisValues(datasets[selectedVariable])
    }
  }, [datasets, selectedVariable])

  useEffect(() => {
    const filterDates = (dateLabel) => {
      let s = moment(startDate, 'YYYY-MM-DDTHH:mm')
      let e = moment(endDate, 'YYYY-MM-DDTHH:mm')
      let l = moment(dateLabel, 'YYYY-MM-DD HH:mm:ss')

      return s.isBefore(l) && e.isAfter(l)
    }

    let filteredLabels = labels.filter((label) => filterDates(label))
    let startIndex = labels.indexOf(filteredLabels[0])
    let endIndex = labels.indexOf(filteredLabels[filteredLabels.length - 1])
    setLabelRange(filteredLabels)

    if (
      Object.keys(datasets).includes(selectedVariable) &&
      datasets[selectedVariable].length > 0
    ) {
      let d = datasets[selectedVariable].slice(startIndex, endIndex + 1)
      setYAxisValues(d)
    }
  }, [startDate, endDate, selectedVariable, datasets, labels])

  const variableColorMap = {
    temp: 'rgb(255, 225, 150)',
    wind: 'rgb(100, 150, 125)',
    prec: 'rgb(0, 0, 255)',
    pres: 'rgb(110, 110, 110)',
    hum: 'rgb(200, 200, 100)',
  }

  const variableChartType = {
    temp: 'line',
    wind: 'line',
    prec: 'bar',
    pres: 'line',
    hum: 'line',
  }

  const chartData = {
    labels: labelRange,
    datasets: [
      {
        type: variableChartType[selectedVariable],
        label: labelMap[selectedVariable],
        backgroundColor: variableColorMap[selectedVariable],
        borderColor: variableColorMap[selectedVariable],
        data: yAxisValues,
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${context.parsed.y} ${unitMap[selectedVariable]}`,
          },
        },
      },
    ],
  }

  const options = {
    mantainAspectRatio: false,
    elements: {
      point: {
        radius: isVertical ? 2 : 3
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <Box
      p={1}
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
      }}
    >
      {selectedVariable ? (
        <Chart options={options} data={chartData} />
      ) : (
        <Box
          p={5}
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="body1">
            You must select a meteorological variable to view any data
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ChartComponent
