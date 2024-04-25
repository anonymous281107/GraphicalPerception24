import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSpringRef, animated, useTransition } from '@react-spring/web'
import { Typography } from '@mui/material'
import FullScreenBackdrop from 'components/Molecules/FullScreenBackdrop'
import { useAddSessionData, useToggleToolBar } from 'state'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { KeyLogger, useKeyLoggerContext } from 'components/KeyLogger'
import { CursorTracker, useCursorTrackerContext } from 'components/CursorLogger'



const fullScreenImageStyle = {
    width: "100%", height: '100%', objectFit: 'fill'
}


const Carousel = ({ assets, onNext, initialActiveIndex }) => {
    const transformCompRef = useRef()
    const [transformState, setTransformState] = useState({
        scale: 1,
        posX: 0,
        posY: 0,
        previousX: 0,
        previousY: 0,
        acceleration: 1
    })
    const [data, setData] = useState([])
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
    const [experimentCompleted, setExperimentCompleted] = useState(false)
    const { keyPressed, resetKeys } = useKeyLoggerContext()
    const { cursorState } = useCursorTrackerContext()
    const toggleToolbar = useToggleToolBar()
    const springApi = useSpringRef()
    useEffect(() => {
        setActiveIndex(initialActiveIndex)
        return () => { }
    }, [initialActiveIndex])
    useEffect(() => {
        const panAnimationTime = 10
        // The amount of panning expressed in pixels
        const step = 60
        // The number of pixels around the screen edges where the mouse cursor should be to trigger panning movements
        const panningActiveArea = 100
        if (transformState.scale > 1) {
            const posMovingX = cursorState.x - cursorState.previousX
            const posMovingY = cursorState.y - cursorState.previousY
            // Cursor is at right edge of the screen and cursor is moving right
            if (cursorState.pageWidth - cursorState.x <= panningActiveArea && posMovingX > 0) {
                // Max width of the pannable area
                const maxWidth = window.innerWidth * transformState.scale
                // We subtract the posX to move right
                const newPosX = transformState.posX - step
                // Width of the scrollable area after changing the position of x axis
                const newWidth = Math.abs(newPosX) + window.innerWidth
                if (newWidth < maxWidth) {
                    console.log("Pan Right", step, transformCompRef.current)
                    transformCompRef.current.setTransform(newPosX, transformState.posY, transformState.scale, panAnimationTime)
                }
            }
            // Cursor is at right edge of the screen and cursor is moving left
            else if (cursorState.x <= panningActiveArea && posMovingX < 0) {
                // We add the posX to move left
                const newPosX = transformState.posX + step
                if (newPosX < 0) {
                    console.log("Pan Left")
                    transformCompRef.current.setTransform(newPosX, transformState.posY, transformState.scale, panAnimationTime)
                }
            }
            else if (cursorState.pageHeight - cursorState.y <= panningActiveArea && posMovingY > 0) {
                // Max Height of the pannable area
                const maxHeight = window.innerHeight * transformState.scale
                // We subtract the posY to move down
                const newPosY = transformState.posY - step
                // Height of the scrollable area after changing the position of y axis
                const newHeight = Math.abs(newPosY) + window.innerHeight
                if (newHeight < maxHeight) {
                    console.log("Pan down")
                    transformCompRef.current.setTransform(transformState.posX, newPosY, transformState.scale, panAnimationTime)
                }
            }
            else if (cursorState.y <= panningActiveArea && posMovingY < 0) {
                // We add the posY to move up
                const newPosY = transformState.posY + step
                if (newPosY < 0) {
                    console.log("Pan up")
                    transformCompRef.current.setTransform(transformState.posX, newPosY, transformState.scale, panAnimationTime)
                }
            }
        }
        return () => { }
    }, [cursorState])

    const handleChange = () => {
        if (activeIndex < assets.length - 1) {
            onNext({ asset: assets[activeIndex], data })
            setActiveIndex(index => index + 1)
        }
        else if (!experimentCompleted) {
            onNext({ asset: assets[activeIndex], data })
            setExperimentCompleted(true)
        }
    }
    const transitions = useTransition(activeIndex, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
        exitBeforeEnter: true,
        config: {
            duration: 500,
        },
        ref: springApi,
    })

    useLayoutEffect(() => {
        springApi.start()
    }, [activeIndex])

    useEffect(() => {
        if (keyPressed === "ArrowRight") {
            console.log("Move right")
            handleChange()
            resetKeys()
        }
        else if (keyPressed === 'KeyT') {
            toggleToolbar()
            resetKeys()
        }
        return () => {
        }
    }, [keyPressed])
    const handleTransform = (e) => {
        const originalWidth = window.innerWidth
        const originalHeight = window.innerHeight
        const scaledWidth = originalWidth * e.state.scale
        const scaledHeight = originalHeight * e.state.scale
        const currentPosXPercent = e.state.positionX / scaledWidth * 100
        const currentPosYPercent = e.state.positionY / scaledHeight * 100
        // console.log("Check this", e.state)
        setTransformState(state => {
            return {
                scale: e.state.scale,
                posX: e.state.positionX,
                posY: e.state.positionY,
            }

        })
        setData(state => [...state, { scale: e.state.scale, posX: currentPosXPercent, posY: currentPosYPercent, windowWidth: originalWidth, windowHeight: originalHeight, time: new Date().toJSON() }])
        // data.push(e.state)
    }
    console.log("My Asset name is", assets[activeIndex])
    return (
        <FullScreenBackdrop enabled>{
            !experimentCompleted ?
                transitions((springs, item) => (
                    <TransformWrapper
                        ref={transformCompRef}
                        initialScale={1}
                        minScale={1}
                        zoomAnimation={{
                            disabled: true
                        }}
                        onTransformed={handleTransform}
                        onInit={(e) => {
                            console.log("INIT", e.state)
                        }}
                    >
                        <TransformComponent>
                            <animated.div style={{ ...springs, height: '100vh', width: '100vw' }}>
                                <img style={fullScreenImageStyle} src={assets[item]} alt="img" />
                            </animated.div>
                        </TransformComponent>
                    </TransformWrapper>

                ))
                :
                <Typography sx={{ color: "#fff" }}>
                    Experiment Completed
                </Typography>
        }

        </FullScreenBackdrop>
    )
}
export default function Experiment({ sessionData }) {
    const addSessionData = useAddSessionData()
    // let activeIndex = 0
    const handleNext = (data) => {
        // console.log("Adding:", data.asset)
        addSessionData({
            id: sessionData.id,
            payload: {
                [data.asset]: data.data
            }
        })
    }
    // console.log("My initialActiveIndex", initialActiveIndex)
    return (
        <KeyLogger>
            <CursorTracker>
                <Carousel onNext={handleNext} assets={sessionData.assets} initialActiveIndex={0} />
            </CursorTracker>
        </KeyLogger>
    )
}
