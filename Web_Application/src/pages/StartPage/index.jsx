import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSessions } from 'state';
import Experiment from "components/Experiment";
import { Typography } from '@mui/material';

export default function Start() {
    const [selectedSession, setSelectedSession] = useState({ data: null, loading: true })
    const { sessionId } = useParams();
    const sessions = useSessions()
    useEffect(() => {
        if (sessionId) {
            setSelectedSession({ loading: false, data: sessions.find(session => session.id === sessionId) })
        }
        else {
            setSelectedSession(state => ({ ...state, loading: false }))
        }
        return () => { }
    }, [])
    if (selectedSession.loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    else if (!selectedSession.data) {
        return (
            <Typography sx={{
                fontWeight: 600,
                fontSize: 24
            }}>
                Session Not found
            </Typography>
        )
    }
    return (
        <div>
            <Experiment sessionData={selectedSession.data} />
        </div>
    )
}
