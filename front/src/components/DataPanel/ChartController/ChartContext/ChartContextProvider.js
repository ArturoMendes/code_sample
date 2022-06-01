import { createContext, useContext, useState } from 'react'
import moment from 'moment'

export const ChartContext = createContext(null)

export const useChartContext = () => useContext(ChartContext)

export const ChartContextProvider = (props) => {
  const today = new Date()
  const [startDate, setStartDate] = useState(
    moment(today).subtract(1, 'month').format('YYYY-MM-DDTHH:mm')
  )
  const [endDate, setEndDate] = useState(
    moment(today).format('YYYY-MM-DDTHH:mm')
  )
  const [selectedVariable, setSelectedVariable] = useState('')

  return (
    <ChartContext.Provider
      value={{
        startDate,
        endDate,
        selectedVariable,
        setStartDate,
        setEndDate,
        setSelectedVariable,
      }}
    >
      {props.children}
    </ChartContext.Provider>
  )
}
