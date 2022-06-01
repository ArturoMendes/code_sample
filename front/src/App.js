import { AppBar, Box, Typography } from '@mui/material'
import DataPanel from './components/DataPanel'
import MainMap from './components/MainMap'

function App() {
  return (
    <div
      className="App"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        boxSizing: 'border-box',
      }}
    >
      <AppBar position="static">
        <Box p={1}>
          <Typography variant="h6">Meteorological Data Viewer</Typography>
        </Box>
      </AppBar>
      <Box
        className="app-main-container"
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MainMap />
        <DataPanel />
      </Box>
    </div>
  )
}

export default App
