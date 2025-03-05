import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Use percentage for responsiveness
  maxWidth: 500, // Cap the width for larger screens
  maxHeight: '80vh', // Limit height to 80% of viewport height
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Enable vertical scrolling if content overflows
};

const HelpModal = ({ open, onClose, content }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="help-modal-title"
    aria-describedby="help-modal-description"
  >
    <Box sx={style}>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        id="help-modal-description"
        variant="body1"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  </Modal>
);

export default HelpModal;