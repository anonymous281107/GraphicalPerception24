import { Box } from '@mui/material'
import React from 'react'

export default function BottomBar({ children }) {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw',
            p: 3,
            backgroundColor: 'grey.400'
        }}>{children}</Box>
    )
}
