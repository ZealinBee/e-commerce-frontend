import React from 'react'
import {Button} from "@mui/material"

interface ConfirmationPromptProps {
    action: string
    handleCancel: () => void
    handleConfirmation: () => void
}

function ConfirmationPrompt({ action, handleCancel, handleConfirmation }: ConfirmationPromptProps) {

  return (
    <div className="confirmation-prompt">
        <div className="confirmation-prompt__box">
            <p>Are you sure you want to {action}?</p>
            <div className="confirmation-prompt__buttons">
                <Button onClick={handleCancel} variant='contained' sx={{mr: "0.5rem"}}>Cancel</Button>
                <Button onClick={handleConfirmation} variant='outlined'>Confirm</Button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationPrompt