import React, { useEffect, useState } from 'react'
import { Form, Input } from 'components/Form'
import { CreateSessionSchema } from 'schema'
import { Button } from '@mui/material'
import { useAddAllSessions, useSessions } from 'state'
import { v4 as uuidV4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import AssestsOverview from 'components/AssestsOverview'
import { papers } from 'configuration';
import { balancedLatinSquare } from "utils/latinSquare";
import { flattenArray, getExperimentAssests } from 'utils'
import { getFileName } from 'utils/files'


const initialData = {
    id: null,
    name: null,
    nodes: {},
    assets: [],
}

export default function CreateSession() {
    const [allSessions, setAllSessions] = useState(null)
    const addAllSessions = useAddAllSessions()
    // const addSession = useAddNewSesssion()
    // const updateSession = useUpdateNewSesssion()
    const { sessionId } = useParams();
    const [session, setSession] = useState({
        data: initialData,
        loading: true,
    })
    const sessions = useSessions()
    const navigate = useNavigate()
    console.log("sessions", sessions)
    useEffect(() => {
        if (sessionId) {
            const foundSession = sessions.find(session => session.id === sessionId)
            if (foundSession) {
                setSession({ loading: false, data: foundSession })
            }
            else {
                setSession(state => ({ ...state, loading: false }))
            }
        }
        else {
            setSession({ loading: false, data: initialData })
        }
        return () => { }
    }, [])

    const handleSubmit = ({ numberOfParticipants }) => {
        if (!allSessions) {
            const allSquares = {}
            const experiments = flattenArray(papers.map(paper => (paper.experiments.map(experiment => ({ name: experiment.name, assets: experiment.assets })))))
            for (let i = 0; i < numberOfParticipants; i++) {
                allSquares[`participant-${i + 1}`] = { id: uuidV4(), name: `participant-${i + 1}`, data: {}, session: [] }
                // Get the latin square for this participant with experiment order
                const experimentLatinSquare = balancedLatinSquare(experiments.map(experiment => experiment.name), i)
                let assetLatinSquare = []
                // Generate a new latin square row for each experiments assets w.r.t each participant
                for (let j = 0; j < experimentLatinSquare.length; j++) {
                    // Get all the assets for this experiment
                    const experimentAssests = getExperimentAssests(experimentLatinSquare[j])
                    // Get the assets latin square row for this participant
                    assetLatinSquare = balancedLatinSquare(experimentAssests, i)
                    allSquares[`participant-${i + 1}`]['session'].push({
                        name: experimentLatinSquare[j],
                        assets: assetLatinSquare,
                    })
                }
            }
            setAllSessions(allSquares)
            // console.log("The allSquares are", allSquares)
        }
        else {
            addAllSessions(allSessions)
            navigate("/")
        }
        // console.log("The numberOfParticipants are", numberOfParticipants)
    }
    if (session.loading) {
        return <div>
            Please Wait
        </div>
    }
    // console.log("Check sessionData", allSessions)
    return (
        <>
            <Form
                defaultValues={session.data ? { name: session.data.name } : { name: "" }}
                sx={{
                    px: 5
                }} onSubmit={handleSubmit} schema={CreateSessionSchema}>
                <Input style={{ alignItems: "start" }} name="numberOfParticipants" label="Number of Participants" />
                <Button
                    variant="contained"
                    type="submit">
                    {allSessions ? "Submit" : "Generate"}
                </Button>
            </Form>
            <div style={{ margin: '0 0 100px 0' }}>
                {allSessions && Object.keys(allSessions).map((sessionKey, index) => {
                    const sessionData = allSessions[sessionKey].session
                    // console.log("sessionData", sessionData)
                    return (<ul key={sessionKey}>
                        <li>
                            <span style={{ fontSize: '1.2em' }}><b>{sessionKey}</b></span> <br />
                            {sessionData.map((data, index) => (data?.assets?.map((asset, index) => data?.assets.length - 1 === index ? getFileName(asset).split('.')[0] : `${getFileName(asset).split('.')[0]}=>`)))}
                        </li>
                    </ul>)
                })}
            </div>

            <AssestsOverview selectedAssests={session.data.assets} />
        </>

    )
}
