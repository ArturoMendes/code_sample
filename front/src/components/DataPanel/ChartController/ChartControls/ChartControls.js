import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import { useChartContext } from '../ChartContext'

const ChartControls = ({ variables = []}) => {
  const windowWidth = window.innerWidth
  const {
    selectedVariable,
    setSelectedVariable,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useChartContext()

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value)
  }

  const handleVariableChange = (event) => {
    let label = event.target.value
    setSelectedVariable(label)
  }

  return (
    <Paper>
      <Box
        p={2}
        sx={{
          display: 'flex',
          flexFlow: windowWidth > 900 ? 'row nowrap' : 'column nowrap',
          justifyContent: 'space-between',
          alignContent: 'center',
          gap: '20px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <FormControl sx={{ minWidth: '300px' }}>
          <InputLabel>Variable</InputLabel>
          <Select
            value={selectedVariable}
            label="variable"
            onChange={handleVariableChange}
          >
            {Object.keys(variables).map((code, idx) => (
              <MenuItem key={idx} value={code}>
                {variables[code]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            flexBasis: '50%',
            display: 'flex',
            flexFlow: windowWidth > 900 ? 'row nowrap' : 'column nowrap',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            gap: '15px',
          }}
        >
          <FormControl onChange={handleStartDateChange}>
            <TextField
              label="Start date:"
              type="datetime-local"
              value={startDate}
              sx={{ minWdith: '250px', flexBasis: '50%' }}
            />
          </FormControl>
          <FormControl onChange={handleEndDateChange}>
            <TextField
              label="End date"
              type="datetime-local"
              value={endDate}
              sx={{ minWdith: '250px', flexBasis: '50%' }}
            />
          </FormControl>
        </Box>
      </Box>
    </Paper>
  )
}

export default ChartControls
