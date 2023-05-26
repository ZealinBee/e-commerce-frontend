import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, LinearProgress } from '@mui/material';

interface ActionModalProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const ActionModal = ({open, onClose, message} : ActionModalProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer : NodeJS.Timeout;
    if (open) {
      timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress - 1);
      }, 30);
    }
    return () => {
      clearInterval(timer);
    };
  }, [open]);

  useEffect(() => {
    if (progress <= 0) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography>{message}</Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Modal>
  );
};

export default ActionModal;
