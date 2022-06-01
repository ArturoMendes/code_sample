import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'

const ErrorDialog = ({ message = '' }) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>The application failed miserably</DialogTitle>
      <DialogContent>
        {message && (
          <DialogContentText>
            The description of the error is: {message}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Accept with resignation</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDialog
