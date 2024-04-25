const { createContext, useState, useEffect, useContext } = require("react");

const CursorTrackerContext = createContext()
export const useCursorTrackerContext = () => useContext(CursorTrackerContext)

export const CursorTracker = ({ children }) => {
    const [cursorState, setCursorState] = useState({ x: 0, y: 0, previousX: 0, previousY: 0, movementX: 0, pageHeight: 0, pageWidth: 0 })
    const handleMouseMove = (e) => {
        setCursorState(state => ({
            x: e.pageX,
            y: e.pageY,
            previousX: state.x,
            previousY: state.y,
            movementX: e.movementX,
            movementY: e.movementY,
            pageHeight: window.innerHeight,
            pageWidth: window.innerWidth
        }))
        const cursorX = e.pageX
        const cursorY = e.pageY
        const pageHeight = window.innerHeight
        const pageWidth = window.innerWidth
        if (pageWidth - cursorX <= 5) {
            console.log("Move Right", e.movementX)
        }
        else if (cursorX <= 5) {
            console.log("Move Left", e.movementX)
        }
        else if (pageHeight - cursorY <= 5) {
            console.log("Move down")
        }
        else if (cursorY <= 5) {
            console.log("Move up")
        }
    }
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    })
    return (<CursorTrackerContext.Provider value={{ cursorState }}>
        {children}
    </CursorTrackerContext.Provider>)
}