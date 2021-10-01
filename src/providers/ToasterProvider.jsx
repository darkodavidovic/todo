import React, { useState, createContext } from 'react'

export const ToasterContext = createContext()

function ToasterProvider(props) {

    const [toaster, setToaster] = useState([])

    return (
        <ToasterContext.Provider value={{toaster, setToaster}}>
            {props.children}
        </ToasterContext.Provider>
    )
}

export default ToasterProvider
