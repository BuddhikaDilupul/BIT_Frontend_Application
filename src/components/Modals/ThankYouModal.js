import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router'
import ThankYouNote from '../Images/Thank-You-Note.png'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
  width: '100%',
  '@media (min-width: 780px)': {
    width: 'auto',
  },
}

export default function ThanYouModal() {
  const [open, setOpen] = React.useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    navigate('/myorders')
  }
  const navigate = useNavigate()
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={ThankYouNote} alt="thank you" style={{ width: '100%' }} />
        </Box>
      </Modal>
    </div>
  )
}
