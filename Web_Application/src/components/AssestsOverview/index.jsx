import { Card, Typography } from '@mui/material'
import BottomBar from 'components/BottomBar'
import React, { useEffect, useState } from 'react'
import { getExperimentAssests } from 'utils'

export default function AssestsOverview({ selectedAssests }) {
    const [assetCount, setAssetCount] = useState({
        exp1: 0,
    })
    useEffect(() => {
        setAssetCount({
            exp1: getExperimentAssests("experiment1").length,
        })
        return () => { }
    }, [selectedAssests])
    return (
        <BottomBar>
            <Card sx={{
                p: 2,
                maxWidth: "90%",
                display: "flex",
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            }}>
                <Typography>
                    <b>Experiment 1:</b> {assetCount.exp1}
                </Typography>
                <Typography>
                    <b>Total:</b> {assetCount.exp1}
                </Typography>
            </Card>
        </BottomBar>
    )
}
