import { Box, Typography } from '@mui/material'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'

const SwipePanel = (props) => {
  const [swipeOpen, setSwipeOpen] = useState(false)

  const handleSwipeToggle = () => {
    setSwipeOpen(!swipeOpen)
  }

  const handleSwipeChange = (state) => {
    if (state !== swipeOpen) {
      setSwipeOpen(state)
    }
  }

  return (
    <SwipeableBottomSheet
      id="swipe-panel"
      open={swipeOpen}
      fullScreen={false}
      topShadow={false}
      shadowTip={false}
      onChange={handleSwipeChange}
      style={{
        zIndex: 999,
      }}
      bodyStyle={{
        borderRadius: '30px 30px 0 0',
        display: 'flex',
        flexFlow: 'column nowrap',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      overflowHeight={64}
    >
      <Box
        p={3}
        sx={{
          userSelect: 'none',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <Typography variant="h6">
          {props.title ? props.title : 'No station selected'}
        </Typography>
        <Box
          onClick={handleSwipeToggle}
          title="minimize panel"
          sx={{ cursor: 'pointer' }}
        >
          {swipeOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Box>
      </Box>
      <Box
        p={2}
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          overflow: 'hidden',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {props.children}
      </Box>
    </SwipeableBottomSheet>
  )
}

export default SwipePanel
