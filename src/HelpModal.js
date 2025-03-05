import React from 'react';
import { Modal, Box, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const HelpModal = ({ open, onClose, content, onDeepDive }) => (
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
      {onDeepDive && (
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={onDeepDive}
        >
          Walkthrough
        </Button>
      )}
    </Box>
  </Modal>
);

export default HelpModal;