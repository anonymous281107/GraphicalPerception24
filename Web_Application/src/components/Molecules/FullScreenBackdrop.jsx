import { useTheme } from '@emotion/react'
import { Box, Button } from '@mui/material'
import { ExperimentZIndex } from 'configuration'
import React from 'react'


export default function FullScreenBackdrop({ children, enabled = false }) {
    return (
        <Box sx={{
            position: "fixed",
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            background: "#000",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: ExperimentZIndex,
            opacity: enabled ? 1 : 0,
            pointerEvents: enabled ? 'auto' : 'none'
        }}
        >
            {children}
        </Box>
    )
}
