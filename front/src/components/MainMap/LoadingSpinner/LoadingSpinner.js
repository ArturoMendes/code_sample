const { Box, CircularProgress, Typography } = require('@mui/material')

const LoadingSpinner = ({ message }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <CircularProgress />
        {message && <Typography variant="body1">{message}</Typography>}
      </Box>
    </Box>
  )
}

export default LoadingSpinner
