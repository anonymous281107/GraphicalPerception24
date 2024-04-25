const { useState, useEffect, createContext, useContext } = require("react")

const KeyLoggerContext = createContext()
export const useKeyLoggerContext = () => useContext(KeyLoggerContext)

export const KeyLogger = ({ children }) => {
    const [keyPressed, setKeyPressed] = useState(null)
    const resetKeys = () => setKeyPressed(null)
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeyPressed(e.code)
        }
        window.addEventListener("keyup", handleKeyDown)
        return () => {
            window.removeEventListener("keyup", handleKeyDown)
        }
    })
    return (<KeyLoggerContext.Provider value={{ keyPressed, resetKeys }}>
        {children}
    </KeyLoggerContext.Provider>)
}