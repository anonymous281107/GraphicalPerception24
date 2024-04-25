import { flattenArray } from "utils";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'

// Custom storage object
const storage = {
    getItem: async (name) => {
        // console.log(name, 'has been retrieved')
        return (await get(name)) || null
    },
    setItem: async (name, value) => {
        // console.log(name, 'with value', value, 'has been saved')
        await set(name, value)
    },
    removeItem: async (name) => {
        // console.log(name, 'has been deleted')
        await del(name)
    },
}

export const useToolBar = create(set => {
    return {
        toolBarOpen: false,
        setToolBaropen: (toolBarOpen) => set((state) => ({ ...state, toolBarOpen })),
        toggleToolBar: () => set(state => ({ ...state, toolBarOpen: state.toolBarOpen ? false : true }))
    }
})
export const useStore = create(persist((set) => {
    return {
        // zoomRatio: 0,
        sessions: [],
        addAllSessions: (allSessions) => set((state) => ({
            ...state, sessions: Object.keys(allSessions).map(participantName => ({
                id: allSessions[participantName].id,
                name: participantName,
                assets: flattenArray(allSessions[participantName].session.map(session => (session.assets))),
                data: allSessions[participantName].data,

            }))
        })),
        clearAllSessions: () => set((state) => ({ ...state, sessions: [] })),
        addSessionData: (data) => { console.log("setting data", data); return set((state) => ({ ...state, sessions: state.sessions.map(session => session.id === data.id ? { ...session, data: { ...session.data, ...data.payload } } : session) })) },
        deleteSessionData: (deleteSessionId) => { return set((state) => ({ ...state, sessions: state.sessions.map(session => session.id === deleteSessionId ? { ...session, data: {} } : session) })) },
    };
}, {
    name: 'AppStateStorage', // unique name
    storage: createJSONStorage(() => storage)
}));

// State Selectors
export const useSessions = () => useStore(state => state.sessions)

export const useToolBarState = () => useToolBar(state => state.toolBarOpen)
// Action Selectors
export const useAddSessionData = () => useStore(state => state.addSessionData)
export const useDeleteSessionData = () => useStore(state => state.deleteSessionData)


export const useSetToolBarState = () => useToolBar(state => state.setToolBaropen)
export const useToggleToolBar = () => useToolBar(state => state.toggleToolBar)

export const useAddAllSessions = () => useStore(state => state.addAllSessions)
export const useClearAllSessions = () => useStore(state => state.clearAllSessions)

